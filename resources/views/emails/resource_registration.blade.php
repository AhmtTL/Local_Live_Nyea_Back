@component('mail::message')
# Resource Registration Confirmation

Dear {{ $registration->guest_name ?? $registration->user->name ?? 'Participant' }},

Thank you for registering for our Resource Session!

**Session:** {{ $registration->resourceSession->title ?? 'N/A' }}

@if($registration->user)
**Registered User:** {{ $registration->user->email }}
@endif

We look forward to your participation.

Thanks,
The Nyea Team
@endcomponent
