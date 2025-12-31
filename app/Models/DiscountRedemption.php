<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DiscountRedemption extends Model
{
    use HasFactory;

    protected $fillable = [
        'discount_code_id',
        'user_email',
        'stripe_session_id',
        'amount_discounted',
    ];

    protected $casts = [
        'amount_discounted' => 'decimal:2',
    ];

    /**
     * Get the discount code that was redeemed
     */
    public function discountCode(): BelongsTo
    {
        return $this->belongsTo(DiscountCode::class);
    }
}