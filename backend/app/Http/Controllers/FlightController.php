<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use Carbon\Carbon;
use Illuminate\Http\Request;

class FlightController extends Controller
{
    public function nextWeek()
    {
        $now = Carbon::parse('2022-01-14'); // As per assignment
        $nextWeek = $now->copy()->addWeek();

        $flights = Flight::whereHas('event', function($query) use ($now, $nextWeek) {
            $query->whereBetween('start_time', [$now, $nextWeek]);
        })->with('event')->get();

        return response()->json($flights);
    }

    public function fromLocation(Request $request, $location)
    {
        $flights = Flight::where('departure_airport', strtoupper($location))
            ->with('event')
            ->get();

        return response()->json($flights);
    }
}
