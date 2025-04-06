<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Standby extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'duration'
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
