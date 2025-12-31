<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\User;
use App\Models\Program;
use App\Models\WorkshopSession;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Cell\DataType;

class PaymentController extends Controller
{
    /**
     * Display a listing of payments.
     */
    public function index(Request $request): Response
    {
        $query = Payment::with(['user:id,name,email', 'program:id,title,price', 'school:id,name', 'balancePayments'])
            ->where(function($q) {
                // Only show deposit payments (main payments) and single payments (non-split)
                $q->where('is_balance_payment', false)
                  ->orWhereNull('is_balance_payment');
            });

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                // Search in user data
                $q->whereHas('user', function ($userQuery) use ($search) {
                    $userQuery->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })
                    // Search in guest data
                    ->orWhere('guest_name', 'like', "%{$search}%")
                    ->orWhere('guest_email', 'like', "%{$search}%")
                    ->orWhere('guest_school_name', 'like', "%{$search}%")
                    // Search in program data
                    ->orWhereHas('program', function ($programQuery) use ($search) {
                        $programQuery->where('title', 'like', "%{$search}%");
                    })
                    // Search in school data
                    ->orWhereHas('school', function ($schoolQuery) use ($search) {
                        $schoolQuery->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }

        // Filter by school
        if ($request->filled('school_id')) {
            $query->where('school_id', $request->get('school_id'));
        }

        // Filter by date range
        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->get('date_from'));
        }
        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->get('date_to'));
        }

        $payments = $query->latest()
            ->paginate(20)
            ->through(fn($payment) => [
                'id' => $payment->id,
                'user' => $payment->user,
                'program' => $payment->program,
                'school' => $payment->school,
                'amount' => $payment->amount,
                'currency' => $payment->currency,
                'status' => $payment->status,
                'stripe_payment_intent_id' => $payment->stripe_payment_intent_id,
                'paid_at' => $payment->paid_at,
                'created_at' => $payment->created_at,
                'manual_override' => $payment->manual_override,
                'notes' => $payment->notes,
                // Guest information
                'guest_name' => $payment->guest_name,
                'guest_email' => $payment->guest_email,
                'guest_phone' => $payment->guest_phone,
                'guest_school_name' => $payment->guest_school_name,
                'guest_grade' => $payment->guest_grade,
                'guest_city' => $payment->guest_city,
                // Split payment information
                'is_split_payment' => $payment->payment_plan_type !== null,
                'payment_plan_type' => $payment->payment_plan_type,
                'payment_plan_total_amount' => $payment->payment_plan_total_amount,
                'payment_plan_deposit_amount' => $payment->payment_plan_deposit_amount,
                'payment_plan_balance_amount' => $payment->payment_plan_balance_amount,
                'payment_plan_balance_due_at' => $payment->payment_plan_balance_due_at,
                'balance_payment' => $payment->balancePayments->first() ? [
                    'id' => $payment->balancePayments->first()->id,
                    'amount' => $payment->balancePayments->first()->amount,
                    'status' => $payment->balancePayments->first()->status,
                    'paid_at' => $payment->balancePayments->first()->paid_at,
                    'stripe_invoice_id' => $payment->balancePayments->first()->stripe_invoice_id,
                ] : null,
            ]);

        // Get all workshop sessions for filtering
        $workshopSessions = WorkshopSession::with('program:id,title')
            ->orderBy('date', 'desc')
            ->get()
            ->map(fn($session) => [
                'id' => $session->id,
                'title' => $session->program->title . ' - ' . $session->date->format('M d, Y') . ' - ' . $session->location,
            ]);

        // Get all schools for filtering
        $schools = \App\Models\School::orderBy('name')
            ->get(['id', 'name'])
            ->map(fn($school) => [
                'id' => $school->id,
                'name' => $school->name,
            ]);

        return Inertia::render('Admin/Payments/Index', [
            'payments' => $payments,
            'filters' => $request->only(['search', 'status', 'school_id', 'date_from', 'date_to']),
            'workshopSessions' => $workshopSessions,
            'schools' => $schools,
            'stats' => [
                'total_revenue' => Payment::where('status', 'paid')
                    ->where(function($q) {
                        // Count full amounts for single payments and split payment totals for deposit payments
                        $q->whereNull('payment_plan_type') // Single payments
                          ->orWhere(function($subQ) {
                              $subQ->whereNotNull('payment_plan_type')
                                   ->where('is_balance_payment', false); // Only deposit payments for split payments
                          });
                    })
                    ->sum(DB::raw('COALESCE(payment_plan_total_amount, amount)')),
                'pending_amount' => Payment::where('status', 'pending')
                    ->where(function($q) {
                        $q->where('is_balance_payment', false)
                          ->orWhereNull('is_balance_payment');
                    })
                    ->sum(DB::raw('COALESCE(payment_plan_total_amount, amount)')),
                'failed_count' => Payment::where('status', 'failed')
                    ->where(function($q) {
                        $q->where('is_balance_payment', false)
                          ->orWhereNull('is_balance_payment');
                    })
                    ->count(),
                'total_transactions' => Payment::where(function($q) {
                        $q->where('is_balance_payment', false)
                          ->orWhereNull('is_balance_payment');
                    })
                    ->count(),
            ],
        ]);
    }

    /**
     * Display payment details.
     */
    public function show(Payment $payment)
    {
        $payment->load(['user', 'program', 'workshopSession', 'school', 'balancePayments', 'parentPayment']);

        return Inertia::render('Admin/Payments/Show', [
            'payment' => $payment
        ]);
    }

    /**
     * Update payment status (for manual override)
     */
    public function update(Request $request, Payment $payment): RedirectResponse
    {
        $request->validate([
            'status' => 'required|in:pending,processing,paid,failed,refunded',
            'notes' => 'nullable|string',
            'manual_override' => 'boolean',
        ]);

        $payment->update([
            'status' => $request->status,
            'notes' => $request->notes,
            'manual_override' => $request->manual_override ?? true,
            'paid_at' => $request->status === 'paid' && !$payment->paid_at ? now() : $payment->paid_at,
        ]);

        return redirect()->route('admin.payments.index')
            ->with('success', 'Payment updated successfully.');
    }

    /**
     * Export payments data
     */
    public function export(Request $request)
    {
        $query = Payment::with(['user', 'program', 'workshopSession', 'trainingCampSession', 'school']);

        // Apply filters
        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        } else {
            // Default to paid if no status specified
            $query->where('status', 'paid');
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->get('date_from'));
        }
        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->get('date_to'));
        }
        if ($request->filled('workshop_session_id')) {
            $query->where('workshop_session_id', $request->get('workshop_session_id'));
        }

        // Handle multiple school IDs or single school ID
        if ($request->filled('school_ids')) {
            $schoolIds = $request->get('school_ids');
            if (is_array($schoolIds) && !empty($schoolIds)) {
                $query->whereIn('school_id', $schoolIds);
            }
        } elseif ($request->filled('school_id')) {
            // Backward compatibility for single school_id
            $query->where('school_id', $request->get('school_id'));
        }

        $payments = $query->get();
        if ($payments->isEmpty()) {
            return redirect()->route('admin.payments.index')
                ->with('error', 'No payments found with the given filters.');
        }

        // Add UTF-8 BOM to prevent Excel SYLK format detection issue
        $csvData = "\xEF\xBB\xBF";
        $csvData .= "Payment ID,Name,Email,Phone,School,Grade,City,Program,Workshop Session,Training Camp Session,Amount,Currency,Status,Stripe Payment ID,Paid At,Created At\n";

        foreach ($payments as $payment) {
            $workshopInfo = '';
            if ($payment->workshopSession) {
                $workshopInfo = $payment->workshopSession->date->format('M d, Y') . ' - ' . $payment->workshopSession->location;
            }

            $trainingCampInfo = '';
            if ($payment->trainingCampSession) {
                $trainingCampInfo = $payment->trainingCampSession->date->format('M d, Y') . ' - ' . $payment->trainingCampSession->location;
            }

            $schoolName = '';
            if ($payment->school) {
                $schoolName = $payment->school->name;
            } elseif ($payment->guest_school_name) {
                $schoolName = $payment->guest_school_name;
            }

            $csvData .= implode(',', [
                $payment->id,
                '"' . ($payment->guest_name ?? $payment->user->name ?? '') . '"',
                $payment->guest_email ?? $payment->user->email ?? '',
                $payment->guest_phone ?? '',
                '"' . $schoolName . '"',
                $payment->guest_grade ?? '',
                $payment->guest_city ?? '',
                '"' . ($payment->program->title ?? 'N/A') . '"',
                '"' . $workshopInfo . '"',
                '"' . $trainingCampInfo . '"',
                $payment->amount,
                $payment->currency,
                $payment->status,
                $payment->stripe_payment_intent_id ?? '',
                $payment->paid_at ? $payment->paid_at->format('Y-m-d H:i:s') : '',
                $payment->created_at->format('Y-m-d H:i:s'),
            ]) . "\n";
        }

        // Generate descriptive filename
        $filename = 'payments-' . now()->format('Y-m-d');

        // Add school info to filename if specific schools are selected
        if ($request->filled('school_ids')) {
            $schoolIds = $request->get('school_ids');
            if (is_array($schoolIds) && count($schoolIds) > 0) {
                if (count($schoolIds) === 1) {
                    // Single school - try to get school name for filename
                    $school = \App\Models\School::find($schoolIds[0]);
                    if ($school) {
                        $filename .= '-' . Str::slug($school->name);
                    }
                } else {
                    // Multiple schools
                    $filename .= '-' . count($schoolIds) . '-schools';
                }
            }
        } elseif ($request->filled('school_id')) {
            // Single school (backward compatibility)
            $school = \App\Models\School::find($request->get('school_id'));
            if ($school) {
                $filename .= '-' . Str::slug($school->name);
            }
        }

        // Add status to filename if specific status is selected
        if ($request->filled('status')) {
            $filename .= '-' . $request->get('status');
        }

        $filename .= '.csv';

        return response($csvData)
            ->header('Content-Type', 'text/csv; charset=UTF-8')
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '"');
    }

    /**
     * Export payments data as Excel (same data/filters as CSV)
     */
    public function exportExcel(Request $request)
    {
        $query = Payment::with(['user', 'program', 'workshopSession', 'trainingCampSession', 'school']);

        // Apply filters
        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        } else {
            // Default to paid if no status specified
            $query->where('status', 'paid');
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->get('date_from'));
        }
        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->get('date_to'));
        }
        if ($request->filled('workshop_session_id')) {
            $query->where('workshop_session_id', $request->get('workshop_session_id'));
        }

        // Handle multiple school IDs or single school ID
        if ($request->filled('school_ids')) {
            $schoolIds = $request->get('school_ids');
            if (is_array($schoolIds) && !empty($schoolIds)) {
                $query->whereIn('school_id', $schoolIds);
            }
        } elseif ($request->filled('school_id')) {
            // Backward compatibility for single school_id
            $query->where('school_id', $request->get('school_id'));
        }

        $payments = $query->get();
        if ($payments->isEmpty()) {
            return redirect()->route('admin.payments.index')
                ->with('error', 'No payments found with the given filters.');
        }

         // Create a new Spreadsheet
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

       // Set headers
        $headers = [
            'ID',
            'Name',
            'Email',
            'Phone',
            'School',
            'Grade',
            'City',
            'Program',
            'Workshop Session',
            'Training Camp Session',
            'Amount',
            'Currency',
            'Status',
            'Stripe Payment ID',
            'Paid At',
            'Created At',
        ];

         // Write headers to first row
        foreach ($headers as $colIndex => $header) {
            $sheet->setCellValue([$colIndex + 1, 1], $header);
        }

         // Style headers (bold) - dynamically based on header count
        $lastColumn = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex(count($headers));
        $sheet->getStyle('A1:' . $lastColumn . '1')->getFont()->setBold(true);

         // Write data rows
        $rowIndex = 2;
        foreach ($payments as $payment) {
            $workshopInfo = '';
            if ($payment->workshopSession) {
                $workshopInfo = $payment->workshopSession->date->format('M d, Y') . ' - ' . $payment->workshopSession->location;
            }

            $trainingCampInfo = '';
            if ($payment->trainingCampSession) {
                $trainingCampInfo = $payment->trainingCampSession->date->format('M d, Y') . ' - ' . $payment->trainingCampSession->location;
            }

            $schoolName = '';
            if ($payment->school) {
                $schoolName = $payment->school->name;
            } elseif ($payment->guest_school_name) {
                $schoolName = $payment->guest_school_name;
            }

           $rowData = [
                $payment->id,
                $payment->guest_name ?? $payment->user->name ?? '',
                $payment->guest_email ?? $payment->user->email ?? '',
                $payment->guest_phone ?? '',
                $schoolName,
                $payment->guest_grade ?? '',
                $payment->guest_city ?? '',
                $payment->program->title ?? 'N/A',
                $workshopInfo,
                $trainingCampInfo,
                $payment->amount,
                $payment->currency,
                $payment->status,
                $payment->stripe_payment_intent_id ?? '',
                $payment->paid_at ? $payment->paid_at->format('Y-m-d H:i:s') : '',
                $payment->created_at->format('Y-m-d H:i:s'),
            ];

            foreach ($rowData as $colIndex => $value) {
                // Phone number is at index 3 (4th column) - force as text to prevent Excel formatting issues
                if ($colIndex === 3) {
                    $sheet->setCellValueExplicit([$colIndex + 1, $rowIndex], $value, DataType::TYPE_STRING);
                } else {
                    $sheet->setCellValue([$colIndex + 1, $rowIndex], $value);
                }
            }
            $rowIndex++;
        }

         // Auto-size columns - dynamically based on header count
        $columnCount = count($headers);
        for ($i = 1; $i <= $columnCount; $i++) {
            $col = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($i);
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        // Generate filename
        $filename = 'payments-' . now()->format('Y-m-d');

        if ($request->filled('school_ids')) {
            $schoolIds = $request->get('school_ids');
            if (is_array($schoolIds) && count($schoolIds) > 0) {
                if (count($schoolIds) === 1) {
                    $school = \App\Models\School::find($schoolIds[0]);
                    if ($school) {
                        $filename .= '-' . Str::slug($school->name);
                    }
                } else {
                    $filename .= '-' . count($schoolIds) . '-schools';
                }
            }
        } elseif ($request->filled('school_id')) {
            $school = \App\Models\School::find($request->get('school_id'));
            if ($school) {
                $filename .= '-' . Str::slug($school->name);
            }
        }

        if ($request->filled('status')) {
            $filename .= '-' . $request->get('status');
        }
       
        $filename .= '.xlsx';

        // Create Excel file and return as download
        $writer = new Xlsx($spreadsheet);
        $tempFile = tempnam(sys_get_temp_dir(), 'excel_');
        $writer->save($tempFile);

        return response()->download($tempFile, $filename, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ])->deleteFileAfterSend(true);
    }
}
