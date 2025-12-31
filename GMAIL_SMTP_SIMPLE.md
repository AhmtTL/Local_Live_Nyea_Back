# Gmail SMTP Configuration

This guide shows how to configure Gmail SMTP for the contact form email delivery.

---

## Prerequisites

-   Gmail account
-   2-Step Verification enabled on Gmail
-   Backend server running on Laravel

---

## Step 1: Create App Password

1. Visit: https://myaccount.google.com/apppasswords
2. If 2-Step Verification is not enabled, enable it first at: https://myaccount.google.com/security
3. Select **App**: Mail
4. Select **Device**: Other (Custom name) → Enter "Laravel Backend"
5. Click **Generate**
6. Copy the 16-digit password (remove spaces)
    - Example: `abcd efgh ijkl mnop` → `abcdefghijklmnop`

---

## Step 2: Configure Environment Variables

Edit `.env` file in the backend root directory:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-16-digit-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-email@gmail.com
MAIL_FROM_NAME="NY Empire Academy"
CONTACT_FORM_EMAIL=hello@nyempireacademy.com
```

Replace:

-   `MAIL_USERNAME`: Your Gmail address
-   `MAIL_PASSWORD`: 16-digit app password from Step 1
-   `MAIL_FROM_ADDRESS`: Your Gmail address
-   `CONTACT_FORM_EMAIL`: Destination email for contact form submissions

---

## Step 3: Clear Configuration Cache

```bash
php artisan config:clear
```

---

## Step 4: Restart Server

Stop the server (Ctrl+C) and restart:

```bash
php artisan serve
```

---

## Testing

Test the contact form endpoint:

```bash
curl -X POST http://localhost:8000/api/v1/contact \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "Test message content"
  }'
```

Expected response:

```json
{
    "success": true,
    "message": "Thank you for your message! We will get back to you soon."
}
```

Check the email at the address specified in `CONTACT_FORM_EMAIL`.

---

## Troubleshooting

### Invalid credentials error

-   Verify app password is correct (no spaces)
-   Ensure `MAIL_USERNAME` is full email address
-   Try alternative port/encryption:
    ```env
    MAIL_PORT=465
    MAIL_ENCRYPTION=ssl
    ```

### Email not received

-   Check Gmail Sent folder
-   Check spam folder of recipient
-   Check `storage/logs/laravel.log` for errors

### Configuration not loading

-   Run `php artisan config:clear` again
-   Restart the backend server
-   Verify `.env` file has no syntax errors

---

## Limits

-   Regular Gmail: 500 emails/day
-   Google Workspace: 2,000 emails/day

---

## Security Notes

-   Never commit `.env` file to version control
-   App passwords can be revoked at: https://myaccount.google.com/apppasswords
-   Use environment variables in production deployment
