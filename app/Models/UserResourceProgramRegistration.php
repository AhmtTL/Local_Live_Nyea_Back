<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserResourceProgramRegistration extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'resource_session_id',
        'guest_email',
        'guest_name',
        'payment_id',
        'unique_code',
        'is_checked_in',
        'checked_in_at',
    ];

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
            $code = strtoupper(\Str::random(8));
        } while (static::where('unique_code', $code)->exists());

        return $code;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function resourceSession()
    {
        return $this->belongsTo(ResourceSession::class);
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class);
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
