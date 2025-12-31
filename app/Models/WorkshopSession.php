<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class WorkshopSession extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'date' => 'date',
        'start_date' => 'date',
        'end_date' => 'date',
        'price_override' => 'decimal:2',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'metadata' => 'array',
        'location_highlights' => 'array',
        'mastery_price_multiplier' => 'decimal:2',
    ];

    /**
     * Get the program this session belongs to
     */
    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    /**
     * Get the school this session belongs to
     */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    /**
     * Get payments for this workshop session
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * Get paid payments for this workshop session
     */
    public function paidPayments(): HasMany
    {
        return $this->hasMany(Payment::class)->where('status', 'paid');
    }

    /**
     * Get the effective price for this session
     */
    public function getEffectivePriceAttribute(): float
    {
        // Simply return the price_override if set, otherwise use program price
        // No multipliers - prices should be set directly
        return $this->price_override ?? $this->program->price;
    }

    /**
     * Get the formatted effective price
     */
    public function getFormattedEffectivePriceAttribute(): string
    {
        return '$' . number_format($this->effective_price, 2);
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
     * Scope to get mastery program sessions
     */
    public function scopeMastery($query)
    {
        return $query->where('program_type', 'mastery');
    }

    /**
     * Scope to get essentials program sessions
     */
    public function scopeEssentials($query)
    {
        return $query->where('program_type', 'essentials');
    }

    /**
     * Check if session is full
     */
    public function getIsFullAttribute(): bool
    {
        return $this->booked_spots >= $this->available_spots;
    }

    /**
     * Scope for active sessions
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for bookable sessions (active, future, has spots)
     */
    public function scopeBookable($query)
    {
        return $query->active()
            ->where('date', '>', now());
    }

    /**
     * Scope for sessions by location
     */
    public function scopeByLocation($query, $location)
    {
        return $query->where('location', 'like', "%{$location}%");
    }

    /**
     * Scope for sessions by date range
     */
    public function scopeByDateRange($query, $startDate, $endDate = null)
    {
        $query->where('date', '>=', $startDate);

        if ($endDate) {
            $query->where('date', '<=', $endDate);
        }

        return $query;
    }

    /**
     * Increment booked spots when a booking is made
     */
    public function incrementBookedSpots(int $quantity = 1): bool
    {
        if ($this->remaining_spots >= $quantity) {
            $this->increment('booked_spots', $quantity);
            return true;
        }

        return false;
    }

    /**
     * Decrement booked spots when a booking is cancelled
     */
    public function decrementBookedSpots(int $quantity = 1): bool
    {
        if ($this->booked_spots >= $quantity) {
            $this->decrement('booked_spots', $quantity);
            return true;
        }

        return false;
    }
}
