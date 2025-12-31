<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReferralConversion extends Model
{
    protected $fillable = [
        'referral_id',
        'payment_id',
        'program_id',
        'customer_email',
        'customer_name',
        'customer_grade',
        'amount',
    ];

    public function referral(): BelongsTo
    {
        return $this->belongsTo(Referral::class);
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class);
    }
}
