<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Training Camp Registration</title>
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
            background: linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%);
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
            position: relative;
            overflow: hidden;
        }

        .header::before {
            content: '🏔️';
            position: absolute;
            font-size: 120px;
            opacity: 0.1;
            top: -20px;
            right: -10px;
            transform: rotate(15deg);
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
            position: relative;
            z-index: 1;
        }

        .content {
            background-color: #fef7f0;
            padding: 25px;
            border: 1px solid #fed7aa;
            border-top: none;
        }

        .code-box {
            background: linear-gradient(135deg, #ffffff 0%, #fff7ed 100%);
            border: 2px dashed #ea580c;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(234, 88, 12, 0.1);
        }

        .code {
            font-size: 28px;
            font-weight: bold;
            color: #ea580c;
            letter-spacing: 4px;
            font-family: 'Courier New', monospace;
            text-shadow: 0 1px 2px rgba(234, 88, 12, 0.2);
        }

        .details {
            background: linear-gradient(135deg, #ffffff 0%, #fff7ed 100%);
            padding: 20px;
            margin: 20px 0;
            border-radius: 12px;
            border: 1px solid #fed7aa;
            box-shadow: 0 2px 4px rgba(234, 88, 12, 0.1);
        }

        .details h3 {
            margin-top: 0;
            color: #ea580c;
            font-size: 18px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .details h3::before {
            content: '🏕️';
            font-size: 20px;
        }

        .details p {
            margin: 8px 0;
            font-size: 14px;
        }

        .footer {
            text-align: center;
            padding: 20px;
            color: #92400e;
            font-size: 13px;
            background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%);
        }

        .important {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin: 20px 0;
            border-radius: 6px;
            font-size: 14px;
            box-shadow: 0 2px 4px rgba(245, 158, 11, 0.1);
        }

        .mountain-accent {
            background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
            height: 4px;
            width: 80px;
            margin: 0 auto 15px auto;
            border-radius: 2px;
        }

        p {
            margin: 10px 0;
            font-size: 14px;
        }

        .camp-features {
            background: rgba(234, 88, 12, 0.05);
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
        }

        .camp-features h4 {
            color: #ea580c;
            margin: 0 0 10px 0;
            font-size: 16px;
        }

        .camp-features ul {
            margin: 0;
            padding-left: 20px;
            color: #92400e;
        }

        .camp-features li {
            margin: 5px 0;
            font-size: 13px;
        }
    </style>
</head>

<body>
    <div class="email-wrapper">
        <div class="email-container">
            <div class="header">
                <h1>🏕️ Training Camp Registration Confirmed!</h1>
            </div>

            <div class="content">
                <div class="mountain-accent"></div>
                
                <p>Hello {{ $registration->display_name }},</p>

                <p>Congratulations! Your training camp registration has been confirmed and your payment has been processed successfully.</p>

                <div class="code-box">
                    <p style="margin: 0 0 10px 0; color: #92400e; font-size: 14px;">Your Training Camp Entry Code</p>
                    <div class="code">{{ $registration->unique_code }}</div>
                    <p style="margin: 10px 0 0 0; color: #92400e; font-size: 12px;">Present this code at the training camp check-in</p>
                </div>

                <div class="important">
                    <strong>🏔️ Important Training Camp Information:</strong> Please save this email and present your unique code when you arrive at the training camp. This code validates your payment and secures your spot in this intensive learning experience.
                </div>

                <div class="details">
                    <h3>Training Camp Details</h3>
                    <p><strong>Program:</strong> {{ $registration->program->title }}</p>
                    @if($registration->trainingCampSession)
                    <p><strong>Session Type:</strong> {{ ucfirst($registration->trainingCampSession->program_type) }} Training</p>
                    <p><strong>Date:</strong> {{ $registration->trainingCampSession->date ? $registration->trainingCampSession->date->format('F j, Y') : 'TBA' }}</p>
                    @if($registration->trainingCampSession->start_date && $registration->trainingCampSession->end_date)
                    <p><strong>Duration:</strong> {{ $registration->trainingCampSession->start_date->format('M j') }} - {{ $registration->trainingCampSession->end_date->format('M j, Y') }}</p>
                    @endif
                    <p><strong>Time:</strong> {{ $registration->trainingCampSession->time ? $registration->trainingCampSession->time : 'TBA' }}@if($registration->trainingCampSession->timezone), {{ $registration->trainingCampSession->timezone }}@endif</p>
                    <p><strong>Location:</strong> {{ $registration->trainingCampSession->location ?? 'TBA' }}</p>
                    @if($registration->trainingCampSession->venue_name)
                    <p><strong>Venue:</strong> {{ $registration->trainingCampSession->venue_name }}</p>
                    @endif
                    @if($registration->trainingCampSession->venue_address)
                    <p><strong>Address:</strong> {{ $registration->trainingCampSession->venue_address }}</p>
                    @endif
                    @endif
                    <p><strong>Registration Code:</strong> {{ $registration->unique_code }}</p>
                </div>

                @if($registration->trainingCampSession && $registration->trainingCampSession->location_highlights)
                <div class="camp-features">
                    <h4>🌟 Training Camp Highlights</h4>
                    <ul>
                        @foreach($registration->trainingCampSession->location_highlights as $highlight)
                        <li>{{ $highlight }}</li>
                        @endforeach
                    </ul>
                </div>
                @endif

                <div class="camp-features">
                    <h4>🎒 What to Expect</h4>
                    <ul>
                        <li>Intensive hands-on training sessions</li>
                        <li>Expert instruction and mentorship</li>
                        <li>Networking with fellow participants</li>
                        <li>Comprehensive learning materials</li>
                        <li>Certificate of completion</li>
                    </ul>
                </div>

                <p>If you have any questions about your training camp or need assistance, please don't hesitate to contact us.</p>

                <p>We're excited to welcome you to this transformative learning experience!</p>

                <p style="margin-top: 30px;">
                    Best regards,<br>
                    <strong>The NYEA Training Camp Team</strong> 🏔️
                </p>
            </div>

            <div class="footer">
                <div class="mountain-accent"></div>
                <p>This is an automated email. Please do not reply to this message.</p>
                <p>&copy; {{ date('Y') }} NYEA. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>

</html>