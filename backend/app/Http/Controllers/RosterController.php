<?php

namespace App\Http\Controllers;

use App\Services\RosterParserService;
use Illuminate\Http\Request;

class RosterController extends Controller
{
    protected $rosterParser;

    public function __construct(RosterParserService $rosterParser)
    {
        $this->rosterParser = $rosterParser;
    }

    public function upload(Request $request)
    {
        $request->validate([
            'roster' => 'required|file|mimes:pdf,xlsx,xls,txt,html,webcal'
        ]);

        try {
            $file = $request->file('roster');
            $events = $this->rosterParser->parse($file);

            return response()->json([
                'message' => 'Roster processed successfully',
                'events_processed' => count($events)
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error processing roster',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
