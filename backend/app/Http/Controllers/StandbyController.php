<?php

namespace App\Http\Controllers;

use App\Models\Standby;
use Carbon\Carbon;
use Illuminate\Http\Request;

class StandbyController extends Controller
{
    public function nextWeek()
    {
        $now = Carbon::parse('2022-01-14'); // As per assignment
        $nextWeek = $now->copy()->addWeek();

        $standbies = Standby::whereHas('event', function($query) use ($now, $nextWeek) {
            $query->whereBetween('start_time', [$now, $nextWeek]);
        })->with('event')->get();

        return response()->json($standbies);
    }
}
