<?php

namespace App\Http\Controllers;

use App\Models\Standby;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class StandbyController extends Controller
{
    public function nextWeek(Request $request)
    {
        try {
            $now = Carbon::parse('2025-01-09');
//            $now = $request->has('date')
//                ? Carbon::parse($request->input('date'))
//                : Carbon::now();

            $nextWeek = $now->copy()->addWeek();

            Log::info('Fetching standby events', [
                'date_range' => [
                    'start' => $now->toDateTimeString(),
                    'end' => $nextWeek->toDateTimeString()
                ]
            ]);

            $standbies = Standby::with(['event' => function ($query) use ($now, $nextWeek) {
                $query->whereBetween('start_time', [$now, $nextWeek]);
            }])
                ->whereHas('event', function ($query) use ($now, $nextWeek) {
                    $query->whereBetween('start_time', [$now, $nextWeek]);
                })
                ->get();

            Log::info('Standby events found', [
                'count' => $standbies->count()
            ]);

            return response()->json($standbies);

        } catch (\Exception $e) {
            Log::error('Standby controller error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
