<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ContactMail;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    /**
     * Store a new contact form submission.
     * 
     * Validates the request, applies rate limiting, saves to database,
     * and sends email notification to the configured admin email.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        // Normalize field names - accept both 'name' and 'fullname'
        $fullname = $request->input('fullname') ?? $request->input('name');
        $request->merge(['fullname' => $fullname]);

        $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        // Apply rate limiting - prevent spam by limiting submissions per email
        $recentSubmission = Contact::where('email', $request->email)
            ->where('created_at', '>', now()->subMinutes(5))
            ->first();

        if ($recentSubmission) {
            return response()->json([
                'success' => false,
                'message' => 'Too many requests. Please wait a few minutes before submitting another message.'
            ], 429);
        }

        $contact = Contact::create([
            'fullname' => $request->fullname,
            'email' => $request->email,
            'phone' => $request->phone,
            'subject' => $request->subject,
            'message' => $request->message,
        ]);

        // Send email notification to configured admin email
        try {
            $adminEmail = env('CONTACT_FORM_EMAIL');
            
            if (!$adminEmail) {
                \Log::error('Contact form email not configured. Set CONTACT_FORM_EMAIL in .env file.');
                throw new \Exception('Email recipient not configured');
            }
            
            Mail::to($adminEmail)->send(new ContactMail($contact));
            \Log::info('Contact form email sent successfully', ['contact_id' => $contact->id]);
        } catch (\Exception $e) {
            // Log the error but don't fail the request - form submission should still succeed
            \Log::error('Failed to send contact form notification email', [
                'contact_id' => $contact->id,
                'error' => $e->getMessage()
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Thank you for your message! We will get back to you soon.',
            'data' => [
                'contact' => [
                    'id' => $contact->id,
                    'fullname' => $contact->fullname,
                    'email' => $contact->email,
                    'phone' => $contact->phone,
                    'subject' => $contact->subject,
                    'message' => $contact->message,
                    'created_at' => $contact->created_at,
                ]
            ]
        ], 201);
    }
}
