<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class School extends Model
{
    protected $fillable = [
        'name',
    ];

    public function workshopSessions(): HasMany
    {
        return $this->hasMany(WorkshopSession::class);
    }

    public function referrals(): HasMany
    {
        return $this->hasMany(Referral::class);
    }
}
