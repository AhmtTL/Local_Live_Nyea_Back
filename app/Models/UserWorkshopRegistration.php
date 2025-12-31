<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class UserWorkshopRegistration extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'is_checked_in' => 'boolean',
        'checked_in_at' => 'datetime',
    ];

    /**
     * Boot the model and generate unique code
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($registration) {
            if (empty($registration->unique_code)) {
                $registration->unique_code = static::generateUniqueCode();
            }
        });
    }

    /**
     * Generate a unique code for the registration
     */
    public static function generateUniqueCode(): string
    {
        do {
            $code = strtoupper(Str::random(8));
        } while (static::where('unique_code', $code)->exists());

        return $code;
    }

    /**
     * Get the user that made this registration
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the program for this registration
     */
    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class);
    }

    /**
     * Get the workshop session for this registration
     */
    public function workshopSession(): BelongsTo
    {
        return $this->belongsTo(WorkshopSession::class);
    }

    /**
     * Mark registration as checked in
     */
    public function checkIn(): void
    {
        $this->update([
            'is_checked_in' => true,
            'checked_in_at' => now(),
        ]);
    }

    /**
     * Get the display name (user or guest)
     */
    public function getDisplayNameAttribute(): string
    {
        if ($this->user) {
            return $this->user->name;
        }
        return $this->guest_name ?: 'Guest';
    }

    /**
     * Get the display email (user or guest)
     */
    public function getDisplayEmailAttribute(): string
    {
        if ($this->user) {
            return $this->user->email;
        }
        return $this->guest_email ?: 'No email';
    }
}
