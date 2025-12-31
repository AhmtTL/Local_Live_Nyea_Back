<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
            'is_influencer' => 'boolean',
            'referred_count' => 'integer',
            'school_name' => 'string',
        ];
    }

    /**
     * Check if user is an admin
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if user is a school user
     */
    public function isSchool(): bool
    {
        return $this->role === 'school';
    }

    /**
     * Check if user is a dev user
     */
    public function isDev(): bool
    {
        return $this->role === 'dev';
    }

    /**
     * Check if user is an influencer
     */
    public function isInfluencer(): bool
    {
        return $this->is_influencer === true;
    }

    /**
     * Get programs the user is interested in
     */
    public function interestedPrograms(): BelongsToMany
    {
        return $this->belongsToMany(Program::class, 'user_programs')
            ->withPivot(['notes'])
            ->withTimestamps();
    }

    /**
     * Get user program records for this user
     */
    public function userPrograms(): HasMany
    {
        return $this->hasMany(UserProgram::class);
    }

    /**
     * Get all payments made by this user
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * Get workshop registrations for this user
     */
    public function workshopRegistrations(): HasMany
    {
        return $this->hasMany(UserWorkshopRegistration::class);
    }

    /**
     * Get training camp registrations for this user
     */
    public function trainingCampRegistrations(): HasMany
    {
        return $this->hasMany(UserTrainingCampRegistration::class);
    }

    /**
     * Get successful payments made by this user
     */
    public function paidPayments(): HasMany
    {
        return $this->hasMany(Payment::class)->where('status', 'paid');
    }

    /**
     * Check if user has purchased a specific program
     */
    public function hasPurchasedProgram(int $programId): bool
    {
        return $this->paidPayments()->where('program_id', $programId)->exists();
    }

    /**
     * Get total amount spent by user
     */
    public function getTotalSpentAttribute(): float
    {
        return (float) $this->paidPayments()->sum('amount');
    }
}
