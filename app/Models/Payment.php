<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Payment extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'amount' => 'decimal:2',
        'paid_at' => 'datetime',
        'metadata' => 'array',
        'manual_override' => 'boolean',
        'payment_plan_total_amount' => 'decimal:2',
        'payment_plan_deposit_amount' => 'decimal:2',
        'payment_plan_balance_amount' => 'decimal:2',
        'payment_plan_balance_due_at' => 'datetime',
        'is_balance_payment' => 'boolean',
    ];

    /**
     * Get the display name for this payment (user name or guest name)
     */
    public function getDisplayNameAttribute(): string
    {
        if ($this->user) {
            return $this->user->name;
        }
        return $this->guest_name ?: 'Guest User';
    }

    /**
     * Get the display email for this payment (user email or guest email)
     */
    public function getDisplayEmailAttribute(): string
    {
        if ($this->user) {
            return $this->user->email;
        }
        return $this->guest_email ?: 'No email';
    }

    /**
     * Check if this is a guest payment
     */
    public function getIsGuestPaymentAttribute(): bool
    {
        return $this->user_id === null;
    }

    /**
     * Get the user that made this payment
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the program this payment is for
     */
    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    /**
     * Get the workshop session this payment is for (if applicable)
     */
    public function workshopSession(): BelongsTo
    {
        return $this->belongsTo(WorkshopSession::class);
    }

    /**
     * Get the training camp session this payment is for (if applicable)
     */
    public function trainingCampSession(): BelongsTo
    {
        return $this->belongsTo(TrainingCampSession::class);
    }

    /**
     * Get the deposit payment that this balance payment belongs to
     */
    public function parentPayment(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_payment_id');
    }

    /**
     * Get any balance payments created from this deposit
     */
    public function balancePayments(): HasMany
    {
        return $this->hasMany(self::class, 'parent_payment_id');
    }

    /**
     * Determine if this payment represents the upfront deposit
     */
    public function getIsDepositAttribute(): bool
    {
        return !$this->is_balance_payment && !is_null($this->payment_plan_type);
    }

    /**
     * Get the school this payment is associated with (if applicable)
     */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    /**
     * Mark payment as paid
     */
    public function markAsPaid(): void
    {
        $this->update([
            'status' => 'paid',
            'paid_at' => now(),
        ]);
    }

    /**
     * Mark payment as failed
     */
    public function markAsFailed(): void
    {
        $this->update(['status' => 'failed']);
    }

    /**
     * Mark payment as processing
     */
    public function markAsProcessing(): void
    {
        $this->update(['status' => 'processing']);
    }
}
