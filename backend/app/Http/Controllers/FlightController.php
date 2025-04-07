<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FlightController extends Controller
{
    public function nextWeek(Request $request)
    {
        try {
            $now = Carbon::parse('2025-01-09');
//            $now = $request->has('date')
//                ? Carbon::parse($request->input('date'))
//                : Carbon::now();

            $nextWeek = $now->copy()->addWeek();
            $flights = Flight::with(['event' => function ($query) use ($now, $nextWeek) {
                $query->whereBetween('start_time', [$now, $nextWeek]);
            }])
                ->whereHas('event', function ($query) use ($now, $nextWeek) {
                    $query->whereBetween('start_time', [$now, $nextWeek]);
                })
                ->get();
            return response()->json($flights);

        } catch (\Exception $e) {
            Log::error('Flight controller error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function fromLocation(Request $request, $location)
    {
        try {
            $flights = Flight::where('departure_airport', strtoupper($location))
                ->with('event')
                ->get();

            return response()->json($flights);

        } catch (\Exception $e) {
            Log::error('Flight location controller error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
