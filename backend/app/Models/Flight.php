<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'flight_number',
        'departure_airport',
        'arrival_airport'
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
