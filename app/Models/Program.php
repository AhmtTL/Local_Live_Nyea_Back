<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Program extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'features' => 'array',
        'price' => 'decimal:2',
        'available_tickets' => 'integer',
        'sold_tickets' => 'integer',
        'is_workshop' => 'boolean',
        'workshop_highlights' => 'array',
        'training_camp_highlights' => 'array',
        'accreditations' => 'array',
        'base_price' => 'decimal:2',
    ];

    /**
     * Get users interested in this program
     */
    public function interestedUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_programs')
            ->withPivot(['notes'])
            ->withTimestamps();
    }

    /**
     * Get user program records for this program
     */
    public function userPrograms(): HasMany
    {
        return $this->hasMany(UserProgram::class);
    }

    /**
     * Get payments for this program
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * Get workshop registrations for this program
     */
    public function workshopRegistrations(): HasMany
    {
        return $this->hasMany(UserWorkshopRegistration::class);
    }

    /**
     * Get training camp registrations for this program
     */
    public function trainingCampRegistrations(): HasMany
    {
        return $this->hasMany(UserTrainingCampRegistration::class);
    }

    /**
     * Get paid payments for this program
     */
    public function paidPayments(): HasMany
    {
        return $this->hasMany(Payment::class)->where('status', 'paid');
    }

    /**
     * Get workshop sessions for this program
     */
    public function workshopSessions(): HasMany
    {
        return $this->hasMany(WorkshopSession::class);
    }

    /**
     * Get active workshop sessions for this program
     */
    public function activeWorkshopSessions(): HasMany
    {
        return $this->hasMany(WorkshopSession::class)->active();
    }

    /**
     * Get bookable workshop sessions for this program
     */
    public function bookableWorkshopSessions(): HasMany
    {
        return $this->hasMany(WorkshopSession::class)->bookable();
    }

    /**
     * Get training camp sessions for this program
     */
    public function trainingCampSessions(): HasMany
    {
        return $this->hasMany(TrainingCampSession::class);
    }

    /**
     * Get active training camp sessions for this program
     */
    public function activeTrainingCampSessions(): HasMany
    {
        return $this->hasMany(TrainingCampSession::class)->active();
    }

    /**
     * Get available training camp sessions for this program
     */
    public function availableTrainingCampSessions(): HasMany
    {
        return $this->hasMany(TrainingCampSession::class)->available();
    }

    /**
     * Get bookable training camp sessions for this program
     */
    // public function bookableTrainingCampSessions(): HasMany
    // {
    //     return $this->hasMany(TrainingCampSession::class)->bookable();
    // }

    /**
     * Get the formatted price
     */
    public function getFormattedPriceAttribute(): string
    {
        return '$' . number_format($this->price, 2);
    }

    /**
     * Get remaining tickets for this program
     */
    public function getRemainingTicketsAttribute(): int
    {
        if ($this->available_tickets === null) {
            return PHP_INT_MAX; // Unlimited tickets
        }

        return max(0, $this->available_tickets - $this->sold_tickets);
    }

    /**
     * Check if program has available tickets
     */
    public function getHasAvailableTicketsAttribute(): bool
    {
        return $this->available_tickets === null || $this->remaining_tickets > 0;
    }

    /**
     * Check if program is sold out
     */
    public function getIsSoldOutAttribute(): bool
    {
        return $this->available_tickets !== null && $this->sold_tickets >= $this->available_tickets;
    }

    /**
     * Get program by slug
     */
    public function scopeBySlug($query, $slug)
    {
        return $query->where('slug', $slug);
    }

    /**
     * Get programs by category
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Search programs by title or description
     */
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
                ->orWhere('category', 'like', "%{$search}%");
        });
    }

    /**
     * Scope to get only workshop programs
     */
    public function scopeWorkshops($query)
    {
        return $query->where('is_workshop', true);
    }

    /**
     * Scope to get only regular programs (non-workshops)
     */
    public function scopeRegularPrograms($query)
    {
        return $query->where('is_workshop', false);
    }

    /**
     * Scope to get only training camp programs
     */
    public function scopeTrainingCamps($query)
    {
        return $query->where('type', 'training_camp');
    }

    /**
     * Check if this program is a workshop
     */
    public function getIsWorkshopTypeAttribute(): bool
    {
        return $this->is_workshop === true;
    }

    /**
     * Get the effective price for workshops (base price or session-specific)
     */
    public function getEffectivePriceAttribute(): float
    {
        if ($this->is_workshop && $this->base_price) {
            return $this->base_price;
        }
        return $this->price;
    }

    /**
     * Get workshop session locations
     */
    public function getWorkshopLocationsAttribute(): array
    {
        if (!$this->is_workshop) {
            return [];
        }

        return $this->workshopSessions()
            ->select('location', 'city', 'country')
            ->distinct()
            ->get()
            ->map(function ($session) {
                return [
                    'location' => $session->location,
                    'city' => $session->city,
                    'country' => $session->country,
                    'full_location' => trim($session->city . ', ' . $session->country, ', '),
                ];
            })
            ->unique('location')
            ->values()
            ->toArray();
    }

    /**
     * Get total workshop capacity across all sessions
     */
    public function getTotalWorkshopCapacityAttribute(): int
    {
        if (!$this->is_workshop) {
            return 0;
        }

        return $this->workshopSessions()->sum('available_spots');
    }

    /**
     * Get total workshop bookings across all sessions
     */
    public function getTotalWorkshopBookingsAttribute(): int
    {
        if (!$this->is_workshop) {
            return 0;
        }

        return $this->workshopSessions()->sum('booked_spots');
    }

    /**
     * Get training camp locations
     */
    public function getTrainingCampLocationsAttribute(): array
    {
        if (!$this->is_training_camp) {
            return [];
        }

        return $this->trainingCampSessions()
            ->select('location', 'city', 'country')
            ->distinct()
            ->get()
            ->map(function ($session) {
                return [
                    'location' => $session->location,
                    'city' => $session->city,
                    'country' => $session->country,
                    'full_location' => trim($session->city . ', ' . $session->country, ', '),
                ];
            })
            ->unique('location')
            ->values()
            ->toArray();
    }

    /**
     * Get total training camp capacity across all sessions
     */
    public function getTotalTrainingCampCapacityAttribute(): int
    {
        if (!$this->is_training_camp) {
            return 0;
        }

        return $this->trainingCampSessions()->sum('available_spots');
    }

    /**
     * Get total training camp bookings across all sessions
     */
    public function getTotalTrainingCampBookingsAttribute(): int
    {
        if (!$this->is_training_camp) {
            return 0;
        }

        return $this->trainingCampSessions()->sum('booked_spots');
    }

    /**
     * Get the program type with backward compatibility
     */
    public function getTypeAttribute($value): string
    {
        // If type is explicitly set, use it
        if ($value) {
            return $value;
        }
        
        // For backward compatibility: if is_workshop is true, return 'workshop'
        if ($this->attributes['is_workshop'] ?? false) {
            return 'workshop';
        }
        
        // Default to 'regular'
        return 'regular';
    }

    /**
     * Check if program is a training camp
     */
    public function getIsTrainingCampAttribute(): bool
    {
        return $this->type === 'training_camp';
    }
}
