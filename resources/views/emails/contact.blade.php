<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
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
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .header p {
            margin: 5px 0 0 0;
            font-size: 14px;
            opacity: 0.9;
        }

        .content {
            padding: 30px 25px;
            background-color: white;
        }

        .info-box {
            background-color: #f9fafb;
            border-left: 4px solid #667eea;
            padding: 15px 20px;
            margin: 20px 0;
            border-radius: 4px;
        }

        .info-box strong {
            color: #667eea;
            display: block;
            margin-bottom: 8px;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .info-box p {
            margin: 0;
            color: #1f2937;
            font-size: 15px;
        }

        .message-box {
            background-color: #ffffff;
            border: 2px solid #e5e7eb;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }

        .message-box h3 {
            margin: 0 0 15px 0;
            color: #667eea;
            font-size: 16px;
        }

        .message-content {
            color: #374151;
            font-size: 14px;
            line-height: 1.8;
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        .details-grid {
            display: table;
            width: 100%;
            margin: 20px 0;
        }

        .detail-row {
            display: table-row;
        }

        .detail-label {
            display: table-cell;
            padding: 10px 20px 10px 0;
            font-weight: 600;
            color: #6b7280;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            width: 30%;
        }

        .detail-value {
            display: table-cell;
            padding: 10px 0;
            color: #1f2937;
            font-size: 14px;
        }

        .footer {
            text-align: center;
            padding: 20px;
            color: #6b7280;
            font-size: 13px;
            background-color: #f9fafb;
            border-top: 1px solid #e5e7eb;
        }

        .footer p {
            margin: 5px 0;
        }

        .timestamp {
            display: inline-block;
            background-color: #e5e7eb;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 12px;
            color: #4b5563;
            margin-top: 15px;
        }

        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
            }

            .content {
                padding: 20px 15px;
            }

            .detail-label,
            .detail-value {
                display: block;
                width: 100%;
                padding: 5px 0;
            }

            .detail-label {
                padding-bottom: 2px;
            }

            .detail-value {
                padding-bottom: 15px;
            }
        }
    </style>
</head>

<body>
    <div class="email-wrapper">
        <div class="email-container">
            <div class="header">
                <h1>📨 New Contact Form Submission</h1>
                <p>Someone has reached out through your website</p>
            </div>

            <div class="content">
                <p style="font-size: 15px; color: #374151; margin-bottom: 20px;">
                    You have received a new message from your contact form.
                </p>

                <div class="details-grid">
                    <div class="detail-row">
                        <div class="detail-label">Full Name</div>
                        <div class="detail-value">{{ $contact->fullname }}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Email Address</div>
                        <div class="detail-value">
                            <a href="mailto:{{ $contact->email }}" style="color: #667eea; text-decoration: none;">
                                {{ $contact->email }}
                            </a>
                        </div>
                    </div>
                    @if($contact->phone)
                    <div class="detail-row">
                        <div class="detail-label">Phone Number</div>
                        <div class="detail-value">
                            <a href="tel:{{ $contact->phone }}" style="color: #667eea; text-decoration: none;">
                                {{ $contact->phone }}
                            </a>
                        </div>
                    </div>
                    @endif
                    <div class="detail-row">
                        <div class="detail-label">Subject</div>
                        <div class="detail-value"><strong>{{ $contact->subject }}</strong></div>
                    </div>
                </div>

                <div class="message-box">
                    <h3>📝 Message</h3>
                    <div class="message-content">{{ $contact->message }}</div>
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <div class="timestamp">
                        ⏰ Received: {{ $contact->created_at->format('F j, Y \a\t g:i A') }}
                    </div>
                </div>

                <div style="margin-top: 30px; padding: 20px; background-color: #f0f9ff; border-radius: 8px; border: 1px solid #bfdbfe;">
                    <p style="margin: 0; font-size: 13px; color: #1e40af; text-align: center;">
                        💡 <strong>Tip:</strong> You can reply directly to this person by clicking their email address above.
                    </p>
                </div>
            </div>

            <div class="footer">
                <p><strong>NY Empire Academy</strong></p>
                <p>Contact Form Notification System</p>
                <p>&copy; {{ date('Y') }} NYEA. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>

</html>

