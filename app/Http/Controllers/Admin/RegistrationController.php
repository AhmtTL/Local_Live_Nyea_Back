<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\UserWorkshopRegistration;
use App\Models\UserTrainingCampRegistration;
use App\Models\WorkshopSession;
use App\Models\TrainingCampSession;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Cell\DataType;

class RegistrationController extends Controller
{
    /**
     * Display a listing of registrations with tabs
     */
    public function index(Request $request): Response
    {
        $tab = $request->get('tab', 'workshops'); // default to workshops tab

        if ($tab === 'training-camps') {
            return $this->getTrainingCampRegistrations($request);
        } else {
            return $this->getWorkshopRegistrations($request);
        }
    }

    /**
     * Get the school name filter for school users
     */
    private function getSchoolFilter(): ?string
    {
        $user = Auth::user();
        if ($user && $user->isSchool()) {
            return $user->school_name;
        }
        return null;
    }

    /**
     * Check if current user is a school user
     */
    private function isSchoolUser(): bool
    {
        $user = Auth::user();
        return $user && $user->isSchool();
    }

    /**
     * Get workshop registrations data
     */
    private function getWorkshopRegistrations(Request $request): Response
    {
        $query = UserWorkshopRegistration::with([
            'user',
            'program',
            'workshopSession',
            'payment'
        ]);

        // Filter by school for school users
        $schoolFilter = $this->getSchoolFilter();
        if ($schoolFilter) {
            $query->whereHas('payment', function ($q) use ($schoolFilter) {
                $q->where('guest_school_name', $schoolFilter);
            });
        }

        // Search by registration code
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('unique_code', 'like', "%{$search}%")
                    ->orWhere('guest_name', 'like', "%{$search}%")
                    ->orWhere('guest_email', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    })
                    ->orWhereHas('program', function ($programQuery) use ($search) {
                        $programQuery->where('title', 'like', "%{$search}%");
                    });
            });
        }

        // Filter by check-in status
        if ($request->filled('status')) {
            $isCheckedIn = $request->get('status') === 'checked_in';
            $query->where('is_checked_in', $isCheckedIn);
        }

        $registrations = $query->latest()->paginate(20);


        // Get all workshop sessions for filtering
        $workshopSessionsQuery = WorkshopSession::with('program:id,title')
            ->orderBy('date', 'desc');
        // If this is a school user, only include sessions that have
        // registrations for this school's students (matching guest_school_name)
        if ($schoolFilter) {
            $sessionIds = UserWorkshopRegistration::whereHas('payment', function ($q) use ($schoolFilter) {
                    $q->where('guest_school_name', $schoolFilter);
                })
                ->whereNotNull('workshop_session_id')
                ->distinct()
                ->pluck('workshop_session_id');

            $workshopSessionsQuery->whereIn('id', $sessionIds);
        }

        $workshopSessions = $workshopSessionsQuery
            ->get()
            ->map(fn($session) => [
                'id' => $session->id,
                'title' => $session->program->title . ' - ' . $session->date->format('M d, Y') . ' - ' . $session->location,
            ]);

        // Calculate stats based on school filter
        $statsQuery = UserWorkshopRegistration::query();
        if ($schoolFilter) {
            $statsQuery->whereHas('payment', function ($q) use ($schoolFilter) {
                $q->where('guest_school_name', $schoolFilter);
            });
        }

        return Inertia::render('Admin/Registrations/Index', [
            'activeTab' => 'workshops',
            'registrations' => $registrations,
            'filters' => $request->only(['search', 'status', 'tab']),
            'sessions' => $workshopSessions,
            'isSchoolUser' => $this->isSchoolUser(),
            'schoolName' => $schoolFilter,
            'stats' => [
                'total_registrations' => (clone $statsQuery)->count(),
                'checked_in' => (clone $statsQuery)->where('is_checked_in', true)->count(),
                'pending_checkin' => (clone $statsQuery)->where('is_checked_in', false)->count(),
            ],
        ]);
    }

    /**
     * Get training camp registrations data
     */
    private function getTrainingCampRegistrations(Request $request): Response
    {
        $query = UserTrainingCampRegistration::with([
            'user',
            'program',
            'trainingCampSession',
            'payment'
        ]);

        // Filter by school for school users
        $schoolFilter = $this->getSchoolFilter();
        if ($schoolFilter) {
            $query->whereHas('payment', function ($q) use ($schoolFilter) {
                $q->where('guest_school_name', $schoolFilter);
            });
        }

        // Search by registration code
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('unique_code', 'like', "%{$search}%")
                    ->orWhere('guest_name', 'like', "%{$search}%")
                    ->orWhere('guest_email', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    })
                    ->orWhereHas('program', function ($programQuery) use ($search) {
                        $programQuery->where('title', 'like', "%{$search}%");
                    });
            });
        }

        // Filter by check-in status
        if ($request->filled('status')) {
            $isCheckedIn = $request->get('status') === 'checked_in';
            $query->where('is_checked_in', $isCheckedIn);
        }

        $registrations = $query->latest()->paginate(20);

        // Get all training camp sessions for filtering
        $trainingCampSessionsQuery = TrainingCampSession::with('program:id,title')
            ->orderBy('date', 'desc');

        // If this is a school user, only include sessions that have
        // registrations for this school's students (matching guest_school_name)
        if ($schoolFilter) {
            $campSessionIds = UserTrainingCampRegistration::whereHas('payment', function ($q) use ($schoolFilter) {
                    $q->where('guest_school_name', $schoolFilter);
                })
                ->whereNotNull('training_camp_session_id')
                ->distinct()
                ->pluck('training_camp_session_id');

            $trainingCampSessionsQuery->whereIn('id', $campSessionIds);
        }

        $trainingCampSessions = $trainingCampSessionsQuery
            ->get()
            ->map(fn($session) => [
                'id' => $session->id,
                'title' => $session->program->title . ' - ' . $session->date->format('M d, Y') . ' - ' . $session->location,
            ]);

        // Calculate stats based on school filter
        $statsQuery = UserTrainingCampRegistration::query();
        if ($schoolFilter) {
            $statsQuery->whereHas('payment', function ($q) use ($schoolFilter) {
                $q->where('guest_school_name', $schoolFilter);
            });
        }

        return Inertia::render('Admin/Registrations/Index', [
            'activeTab' => 'training-camps',
            'registrations' => $registrations,
            'filters' => $request->only(['search', 'status', 'tab']),
            'sessions' => $trainingCampSessions,
            'isSchoolUser' => $this->isSchoolUser(),
            'schoolName' => $schoolFilter,
            'stats' => [
                'total_registrations' => (clone $statsQuery)->count(),
                'checked_in' => (clone $statsQuery)->where('is_checked_in', true)->count(),
                'pending_checkin' => (clone $statsQuery)->where('is_checked_in', false)->count(),
            ],
        ]);
    }

    /**
     * Workshop registration actions
     */
    public function checkInWorkshop(UserWorkshopRegistration $registration): RedirectResponse
    {
        if ($registration->is_checked_in) {
            return back()->with('error', 'Registration already checked in.');
        }

        $registration->checkIn();
        return back()->with('success', 'Registration checked in successfully.');
    }

    public function uncheckInWorkshop(UserWorkshopRegistration $registration): RedirectResponse
    {
        if (!$registration->is_checked_in) {
            return back()->with('error', 'Registration is not checked in.');
        }

        $registration->update([
            'is_checked_in' => false,
            'checked_in_at' => null,
        ]);

        return back()->with('success', 'Registration unchecked successfully.');
    }

    /**
     * Training camp registration actions
     */
    public function checkInTrainingCamp(UserTrainingCampRegistration $registration): RedirectResponse
    {
        if ($registration->is_checked_in) {
            return back()->with('error', 'Registration already checked in.');
        }

        $registration->checkIn();
        return back()->with('success', 'Registration checked in successfully.');
    }

    public function uncheckInTrainingCamp(UserTrainingCampRegistration $registration): RedirectResponse
    {
        if (!$registration->is_checked_in) {
            return back()->with('error', 'Registration is not checked in.');
        }

        $registration->update([
            'is_checked_in' => false,
            'checked_in_at' => null,
        ]);

        return back()->with('success', 'Registration unchecked successfully.');
    }

    /**
     * Export workshop registrations
     */
    public function exportWorkshops(Request $request)
    {
        $query = UserWorkshopRegistration::with([
            'user',
            'program',
            'workshopSession',
            'payment'
        ]);

        // Filter by school for school users
        $schoolFilter = $this->getSchoolFilter();
        if ($schoolFilter) {
            $query->whereHas('payment', function ($q) use ($schoolFilter) {
                $q->where('guest_school_name', $schoolFilter);
            });
        }

        // Apply filters
        if ($request->filled('status')) {
            $isCheckedIn = $request->get('status') === 'checked_in';
            $query->where('is_checked_in', $isCheckedIn);
        }

        if ($request->filled('workshop_session_id')) {
            $query->where('workshop_session_id', $request->get('workshop_session_id'));
        }

        $registrations = $query->latest()->get();

        // Decide export format (CSV vs Excel button)
        $format = $request->get('format') === 'excel' ? 'excel' : 'csv';

        if ($format === 'excel') {
            // Create real Excel file using PhpSpreadsheet
            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();

            $headers = [
                'Registration Code',
                'Name',
                'Email',
                'Phone',
                'School',
                'Grade',
                'City',
                'Program',
                'Workshop Session',
                'Check-in Status',
                'Checked In At',
                'Registered At',
            ];

            foreach ($headers as $colIndex => $header) {
                $sheet->setCellValue([$colIndex + 1, 1], $header);
            }

            // Style headers (bold) - dynamically based on header count
            $lastColumn = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex(count($headers));
            $sheet->getStyle('A1:' . $lastColumn . '1')->getFont()->setBold(true);

            $rowIndex = 2;
            foreach ($registrations as $registration) {
                $workshopInfo = '';
                if ($registration->workshopSession) {
                    $workshopInfo = $registration->workshopSession->date->format('M d, Y') . ' - ' . $registration->workshopSession->location . ' - ' . $registration->workshopSession->time;
                }

                $rowData = [
                    $registration->unique_code,
                    $registration->guest_name ?? $registration->user->name ?? '',
                    $registration->guest_email ?? $registration->user->email ?? '',
                    $registration->payment->guest_phone ?? '',
                    $registration->payment->guest_school_name ?? '',
                    $registration->payment->guest_grade ?? '',
                    $registration->payment->guest_city ?? '',
                    $registration->program->title ?? 'N/A',
                    $workshopInfo,
                    $registration->is_checked_in ? 'Checked In' : 'Pending Check-in',
                    $registration->checked_in_at ? $registration->checked_in_at->format('Y-m-d H:i:s') : '',
                    $registration->created_at->format('Y-m-d H:i:s'),
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

            $filename = 'workshop-registrations-' . now()->format('Y-m-d') . '.xlsx';

            $writer = new Xlsx($spreadsheet);
            $tempFile = tempnam(sys_get_temp_dir(), 'excel_');
            $writer->save($tempFile);

            return response()->download($tempFile, $filename, [
                'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ])->deleteFileAfterSend(true);
        }

        // CSV format
        $csvData = implode(',', [
            'Registration Code',
            'Name',
            'Email',
            'Phone',
            'School',
            'Grade',
            'City',
            'Program',
            'Workshop Session',
            'Check-in Status',
            'Checked In At',
            'Registered At',
        ]) . "\n";

        foreach ($registrations as $registration) {
            $workshopInfo = '';
            if ($registration->workshopSession) {
                $workshopInfo = $registration->workshopSession->date->format('M d, Y') . ' - ' . $registration->workshopSession->location . ' - ' . $registration->workshopSession->time;
            }

            $csvData .= implode(',', [
                $registration->unique_code,
                $registration->guest_name ?? $registration->user->name ?? '',
                $registration->guest_email ?? $registration->user->email ?? '',
                $registration->payment->guest_phone ?? '',
                $registration->payment->guest_school_name ?? '',
                $registration->payment->guest_grade ?? '',
                $registration->payment->guest_city ?? '',
                $registration->program->title ?? 'N/A',
                $workshopInfo,
                $registration->is_checked_in ? 'Checked In' : 'Pending Check-in',
                $registration->checked_in_at ? $registration->checked_in_at->format('Y-m-d H:i:s') : '',
                $registration->created_at->format('Y-m-d H:i:s'),
            ]) . "\n";
        }

        $contentType = $format === 'excel' ? 'application/vnd.ms-excel' : 'text/csv';
        // Use .xls for Excel, .csv for CSV
        $extension = $format === 'excel' ? 'xls' : 'csv';

        return response($csvData)
            ->header('Content-Type', $contentType)
            ->header('Content-Disposition', 'attachment; filename="workshop-registrations-' . now()->format('Y-m-d') . '.' . $extension . '"');
    }

    /**
     * Export training camp registrations
     */
    public function exportTrainingCamps(Request $request)
    {
        $query = UserTrainingCampRegistration::with([
            'user',
            'program',
            'trainingCampSession',
            'payment'
        ]);

        // Filter by school for school users
        $schoolFilter = $this->getSchoolFilter();
        if ($schoolFilter) {
            $query->whereHas('payment', function ($q) use ($schoolFilter) {
                $q->where('guest_school_name', $schoolFilter);
            });
        }

        // Apply filters
        if ($request->filled('status')) {
            $isCheckedIn = $request->get('status') === 'checked_in';
            $query->where('is_checked_in', $isCheckedIn);
        }

        if ($request->filled('training_camp_session_id')) {
            $query->where('training_camp_session_id', $request->get('training_camp_session_id'));
        }

        $registrations = $query->latest()->get();

        // Decide export format (CSV vs Excel button)
        $format = $request->get('format') === 'excel' ? 'excel' : 'csv';

        if ($format === 'excel') {
            // Create real Excel file using PhpSpreadsheet
            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();

            $headers = [
                'Registration Code',
                'Name',
                'Email',
                'Phone',
                'School',
                'Grade',
                'City',
                'Program',
                'Training Camp Session',
                'Check-in Status',
                'Checked In At',
                'Registered At',
            ];

            foreach ($headers as $colIndex => $header) {
                $sheet->setCellValue([$colIndex + 1, 1], $header);
            }

            // Style headers (bold) - dynamically based on header count
            $lastColumn = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex(count($headers));
            $sheet->getStyle('A1:' . $lastColumn . '1')->getFont()->setBold(true);

            $rowIndex = 2;
            foreach ($registrations as $registration) {
                $trainingCampInfo = '';
                if ($registration->trainingCampSession) {
                    $trainingCampInfo = $registration->trainingCampSession->date->format('M d, Y') . ' - ' . $registration->trainingCampSession->location . ' - ' . $registration->trainingCampSession->time;
                }

                $rowData = [
                    $registration->unique_code,
                    $registration->guest_name ?? $registration->user->name ?? '',
                    $registration->guest_email ?? $registration->user->email ?? '',
                    $registration->payment->guest_phone ?? '',
                    $registration->payment->guest_school_name ?? '',
                    $registration->payment->guest_grade ?? '',
                    $registration->payment->guest_city ?? '',
                    $registration->program->title ?? 'N/A',
                    $trainingCampInfo,
                    $registration->is_checked_in ? 'Checked In' : 'Pending Check-in',
                    $registration->checked_in_at ? $registration->checked_in_at->format('Y-m-d H:i:s') : '',
                    $registration->created_at->format('Y-m-d H:i:s'),
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

            $filename = 'training-camp-registrations-' . now()->format('Y-m-d') . '.xlsx';

            $writer = new Xlsx($spreadsheet);
            $tempFile = tempnam(sys_get_temp_dir(), 'excel_');
            $writer->save($tempFile);

            return response()->download($tempFile, $filename, [
                'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ])->deleteFileAfterSend(true);
        }

        // CSV format
        $csvData = implode(',', [
            'Registration Code',
            'Name',
            'Email',
            'Phone',
            'School',
            'Grade',
            'City',
            'Program',
            'Training Camp Session',
            'Check-in Status',
            'Checked In At',
            'Registered At',
        ]) . "\n";

        foreach ($registrations as $registration) {
            $trainingCampInfo = '';
            if ($registration->trainingCampSession) {
                $trainingCampInfo = $registration->trainingCampSession->date->format('M d, Y') . ' - ' . $registration->trainingCampSession->location . ' - ' . $registration->trainingCampSession->time;
            }

            $csvData .= implode(',', [
                $registration->unique_code,
                $registration->guest_name ?? $registration->user->name ?? '',
                $registration->guest_email ?? $registration->user->email ?? '',
                $registration->payment->guest_phone ?? '',
                $registration->payment->guest_school_name ?? '',
                $registration->payment->guest_grade ?? '',
                $registration->payment->guest_city ?? '',
                $registration->program->title ?? 'N/A',
                $trainingCampInfo,
                $registration->is_checked_in ? 'Checked In' : 'Pending Check-in',
                $registration->checked_in_at ? $registration->checked_in_at->format('Y-m-d H:i:s') : '',
                $registration->created_at->format('Y-m-d H:i:s'),
            ]) . "\n";
        }

        $contentType = $format === 'excel' ? 'application/vnd.ms-excel' : 'text/csv';
        // Use .xls for Excel, .csv for CSV
        $extension = $format === 'excel' ? 'xls' : 'csv';

        return response($csvData)
            ->header('Content-Type', $contentType)
            ->header('Content-Disposition', 'attachment; filename="training-camp-registrations-' . now()->format('Y-m-d') . '.' . $extension . '"');
    }
}
