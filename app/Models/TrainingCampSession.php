<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TrainingCampSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'program_id',
        'program_type',
        'school_id',
        'location',
        'city',
        'country',
        'country_code',
        'venue_name',
        'organization_logo',
        'venue_address',
        'location_highlights',
        'date',
        'start_date',
        'end_date',
        'time',
        'timezone',
        'available_spots',
        'booked_spots',
        'price_override',
        'is_active',
        'is_featured',
        'special_notes',
        'metadata',
    ];

    protected $casts = [
        'date' => 'date',
        'start_date' => 'date',
        'end_date' => 'date',
        'available_spots' => 'integer',
        'booked_spots' => 'integer',
        'price_override' => 'decimal:2',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'location_highlights' => 'array',
        'metadata' => 'array',
    ];

    /**
     * Get the program that this training camp session belongs to
     */
    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    /**
     * Get the school associated with this training camp session
     */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    /**
     * Get all payments for this training camp session
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'training_camp_session_id');
    }

    /**
     * Get all registrations for this training camp session
     */
    public function registrations(): HasMany
    {
        return $this->hasMany(UserTrainingCampRegistration::class);
    }

    /**
     * Get the effective price for this session
     */
    public function getEffectivePriceAttribute(): float
    {
        return $this->price_override ?? $this->program->base_price ?? 0;
    }

    /**
     * Get remaining spots
     */
    public function getRemainingAttribute(): int
    {
        return max(0, $this->available_spots - $this->booked_spots);
    }

    /**
     * Check if session is full
     */
    public function getIsFullAttribute(): bool
    {
        return $this->booked_spots >= $this->available_spots;
    }

    /**
     * Get formatted location
     */
    public function getFormattedLocationAttribute(): string
    {
        $parts = array_filter([$this->location, $this->city, $this->country]);
        return implode(', ', $parts);
    }

    /**
     * Scope for active sessions
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for featured sessions
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope for available sessions (not full)
     */
    public function scopeAvailable($query)
    {
        return $query->whereRaw('booked_spots < available_spots');
    }

    /**
     * Get remaining spots for this session
     */
    public function getRemainingspotsAttribute(): int
    {
        return max(0, $this->available_spots - $this->booked_spots);
    }

    /**
     * Check if session is bookable
     */
    public function getIsBookableAttribute(): bool
    {
        return $this->is_active &&
            $this->remaining_spots > 0 &&
            $this->date->isFuture();
    }

    /**
     * Scope for bookable sessions (active, future, has spots)
     */
    public function scopeBookable($query)
    {
        return $query->active()
            ->where('date', '>', now());
    }
}
