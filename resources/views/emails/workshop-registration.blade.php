<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Workshop Registration</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
        }

        .email-wrapper {
            width: 100%;
            background-color: #f3f4f6;
            padding: 20px 0;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
        }

        .header {
            background-color: #4F46E5;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            background-color: #f9fafb;
            padding: 25px;
            border: 1px solid #e5e7eb;
            border-top: none;
        }

        .code-box {
            background-color: white;
            border: 2px dashed #4F46E5;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
            border-radius: 8px;
        }

        .code {
            font-size: 28px;
            font-weight: bold;
            color: #4F46E5;
            letter-spacing: 4px;
            font-family: 'Courier New', monospace;
        }

        .details {
            background-color: white;
            padding: 15px;
            margin: 20px 0;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }

        .details h3 {
            margin-top: 0;
            color: #4F46E5;
            font-size: 18px;
        }

        .details p {
            margin: 8px 0;
            font-size: 14px;
        }

        .footer {
            text-align: center;
            padding: 20px;
            color: #6b7280;
            font-size: 13px;
            background-color: white;
        }

        .important {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 12px;
            margin: 20px 0;
            border-radius: 4px;
            font-size: 14px;
        }

        p {
            margin: 10px 0;
            font-size: 14px;
        }
    </style>
</head>

<body>
    <div class="email-wrapper">
        <div class="email-container">
            <div class="header">
                <h1>Workshop Registration Confirmed!</h1>
            </div>

            <div class="content">
                <p>Hello {{ $registration->display_name }},</p>

                <p>Thank you for your payment! Your registration has been confirmed.</p>

                <div class="code-box">
                    <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">Your Entry Code</p>
                    <div class="code">{{ $registration->unique_code }}</div>
                    <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 12px;">Show this code at the session entrance</p>
                </div>

                <div class="important">
                    <strong>⚠️ Important:</strong> Please save this email and present your unique code when you arrive at the workshop session. This code validates your payment and grants you entry.
                </div>

                <div class="details">
                    <h3>Registration Details</h3>
                    <p><strong>Program:</strong> {{ $registration->program->title }}</p>
                    @if($registration->workshopSession)
                    <p><strong>Date:</strong> {{ $registration->workshopSession->date ? $registration->workshopSession->date->format('F j, Y') : 'TBA' }}</p>
                    <p><strong>Time:</strong> {{ $registration->workshopSession->time ? $registration->workshopSession->time : 'TBA' }}, {{ $registration->workshopSession->timezone ?? 'N/A' }}</p>
                    <p><strong>Location:</strong> {{ $registration->workshopSession->location ?? 'TBA' }}</p>
                    @endif
                    <p><strong>Registration Code:</strong> {{ $registration->unique_code }}</p>
                </div>

                <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>

                <p>We look forward to seeing you!</p>

                <p style="margin-top: 30px;">
                    Best regards,<br>
                    <strong>The NYEA Team</strong>
                </p>
            </div>

            <div class="footer">
                <p>This is an automated email. Please do not reply to this message.</p>
                <p>&copy; {{ date('Y') }} NYEA. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>

</html>