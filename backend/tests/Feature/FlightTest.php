<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Event;
use App\Models\Flight;
use Carbon\Carbon;

class FlightTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_flights_for_next_week()
    {
        $currentDate = Carbon::parse('2022-01-14');

        // Flight within next week
        $event1 = Event::factory()->flight()->create([
            'start_time' => $currentDate->copy()->addDays(2),
            'end_time' => $currentDate->copy()->addDays(2)->addHours(2)
        ]);

        Flight::factory()->create(['event_id' => $event1->id]);

        // Flight outside next week
        $event2 = Event::factory()->flight()->create([
            'start_time' => $currentDate->copy()->addDays(8),
            'end_time' => $currentDate->copy()->addDays(8)->addHours(2)
        ]);

        Flight::factory()->create(['event_id' => $event2->id]);

        $response = $this->getJson('/api/flights/next-week');

        $response->assertStatus(200)
            ->assertJsonCount(1);
    }

    public function test_get_flights_from_location()
    {
        $event = Event::factory()->flight()->create();
        $flight = Flight::factory()->create([
            'event_id' => $event->id,
            'departure_airport' => 'JFK'
        ]);

        // Create another flight from different location
        $event2 = Event::factory()->flight()->create();
        Flight::factory()->create([
            'event_id' => $event2->id,
            'departure_airport' => 'LAX'
        ]);

        $response = $this->getJson('/api/flights/from/JFK');

        $response->assertStatus(200)
            ->assertJsonCount(1)
            ->assertJsonFragment(['departure_airport' => 'JFK']);
    }
}
