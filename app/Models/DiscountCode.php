<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Carbon\Carbon;

class DiscountCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'description',
        'type',
        'value',
        'currency',
        'min_amount',
        'max_redemptions',
        'used_count',
        'starts_at',
        'expires_at',
        'is_active',
        'stripe_coupon_id',
        'stripe_promotion_code_id',
        'created_by',
        'referral_id',
    ];

    protected $casts = [
        'value' => 'decimal:2',
        'min_amount' => 'decimal:2',
        'starts_at' => 'datetime',
        'expires_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    /**
     * Get the user who created this discount code
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the referral that this discount code belongs to
     */
    public function referral(): BelongsTo
    {
        return $this->belongsTo(Referral::class);
    }

    /**
     * Get the redemptions for this discount code
     */
    public function redemptions(): HasMany
    {
        return $this->hasMany(DiscountRedemption::class);
    }

    /**
     * Check if the discount code is currently valid
     */
    public function isValid(): bool
    {
        if (!$this->is_active) {
            return false;
        }

        $now = Carbon::now();

        // Check if not yet started
        if ($this->starts_at && $now->isBefore($this->starts_at)) {
            return false;
        }

        // Check if expired
        if ($this->expires_at && $now->isAfter($this->expires_at)) {
            return false;
        }

        // Check if max redemptions reached
        if ($this->max_redemptions && $this->used_count >= $this->max_redemptions) {
            return false;
        }

        return true;
    }

    /**
     * Check if the discount can be applied to a given amount
     */
    public function canApplyToAmount(float $amount): bool
    {
        if (!$this->isValid()) {
            return false;
        }

        // Check minimum amount requirement
        if ($this->min_amount && $amount < $this->min_amount) {
            return false;
        }

        return true;
    }

    /**
     * Calculate the discount amount for a given subtotal
     */
    public function calculateDiscountAmount(float $subtotal): float
    {
        if (!$this->canApplyToAmount($subtotal)) {
            return 0;
        }

        if ($this->type === 'percentage') {
            return ($subtotal * $this->value) / 100;
        }

        // Fixed amount
        return min($this->value, $subtotal); // Don't exceed the subtotal
    }

    /**
     * Get the formatted discount value for display
     */
    public function getFormattedValueAttribute(): string
    {
        if ($this->type === 'percentage') {
            return $this->value . '%';
        }

        return '$' . number_format($this->value, 2);
    }

    /**
     * Get the status of the discount code
     */
    public function getStatusAttribute(): string
    {
        if (!$this->is_active) {
            return 'inactive';
        }

        $now = Carbon::now();

        if ($this->starts_at && $now->isBefore($this->starts_at)) {
            return 'scheduled';
        }

        if ($this->expires_at && $now->isAfter($this->expires_at)) {
            return 'expired';
        }

        if ($this->max_redemptions && $this->used_count >= $this->max_redemptions) {
            return 'exhausted';
        }

        return 'active';
    }

    /**
     * Increment the usage count
     */
    public function incrementUsage(): void
    {
        $this->increment('used_count');
    }

    /**
     * Scope to get only active discount codes
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to get only valid discount codes (active and within date range)
     */
    public function scopeValid($query)
    {
        $now = Carbon::now();
        
        return $query->where('is_active', true)
            ->where(function ($q) use ($now) {
                $q->whereNull('starts_at')
                  ->orWhere('starts_at', '<=', $now);
            })
            ->where(function ($q) use ($now) {
                $q->whereNull('expires_at')
                  ->orWhere('expires_at', '>=', $now);
            })
            ->whereRaw('(max_redemptions IS NULL OR used_count < max_redemptions)');
    }
}