<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ResourceSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'resource_program_id',
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

    public function resourceProgram(): BelongsTo
    {
        return $this->belongsTo(ResourceProgram::class);
    }

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'resource_session_id');
    }

    public function registrations(): HasMany
    {
        return $this->hasMany(UserResourceProgramRegistration::class, 'resource_session_id');
    }

    public function getEffectivePriceAttribute(): float
    {
        return $this->price_override ?? $this->resourceProgram->base_price ?? 0;
    }

    public function getRemainingAttribute(): int
    {
        return max(0, $this->available_spots - $this->booked_spots);
    }

    public function getIsFullAttribute(): bool
    {
        return $this->booked_spots >= $this->available_spots;
    }

    public function getFormattedLocationAttribute(): string
    {
        $parts = array_filter([$this->location, $this->city, $this->country]);
        return implode(', ', $parts);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeAvailable($query)
    {
        return $query->whereRaw('booked_spots < available_spots');
    }

    public function getRemainingspotsAttribute(): int
    {
        return max(0, $this->available_spots - $this->booked_spots);
    }

    public function getIsBookableAttribute(): bool
    {
        return $this->is_active &&
            $this->remaining_spots > 0 &&
            $this->date->isFuture();
    }

    public function scopeBookable($query)
    {
        return $query->active()
            ->where('date', '>', now());
    }
}
