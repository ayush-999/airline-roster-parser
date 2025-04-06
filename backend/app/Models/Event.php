<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'start_time',
        'end_time',
        'location',
        'metadata'
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'metadata' => 'array'
    ];

    public function flight()
    {
        return $this->hasOne(Flight::class);
    }

    public function standby()
    {
        return $this->hasOne(Standby::class);
    }
}
