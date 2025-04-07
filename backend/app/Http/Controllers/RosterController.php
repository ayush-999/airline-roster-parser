<?php

namespace App\Http\Controllers;

use App\Services\RosterParserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

        Log::info("Starting file upload", [
            'filename' => $request->file('roster')->getClientOriginalName(),
            'size' => $request->file('roster')->getSize()
        ]);

        try {
            $file = $request->file('roster');

            $path = $file->store('temp_rosters');
            $fullPath = storage_path('app/' . $path);

            Log::debug("File stored at: {$fullPath}");

            $events = $this->rosterParser->parse($file);

            unlink($fullPath);

            Log::info("Roster processed successfully", [
                'events_processed' => count($events),
                'filename' => $file->getClientOriginalName()
            ]);

            return response()->json([
                'message' => 'Roster processed successfully',
                'events_processed' => count($events)
            ], 201);

        } catch (\Exception $e) {
            Log::error("Roster processing failed", [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Error processing roster',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
