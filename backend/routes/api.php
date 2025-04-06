<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RosterController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\StandbyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/roster/upload', [RosterController::class, 'upload']);
Route::get('/events', [EventController::class, 'index']);
Route::get('/flights/next-week', [FlightController::class, 'nextWeek']);
Route::get('/standby/next-week', [StandbyController::class, 'nextWeek']);
Route::get('/flights/from/{location}', [FlightController::class, 'fromLocation']);
