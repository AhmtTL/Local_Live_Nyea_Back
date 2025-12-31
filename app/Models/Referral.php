<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Referral extends Model
{
    protected $fillable = [
        'user_id',
        'school_id',
        'referral_code',
        'referral_link',
        'conversions_count',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    public function conversions(): HasMany
    {
        return $this->hasMany(ReferralConversion::class);
    }

    public function discountCode(): HasOne
    {
        return $this->hasOne(DiscountCode::class);
    }
}
