<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Event;
use Carbon\Carbon;

class EventTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_events_by_date_range()
    {
        // Create events within date range
        Event::factory()->create([
            'start_time' => '2022-01-10 08:00:00',
            'end_time' => '2022-01-10 10:00:00'
        ]);

        Event::factory()->create([
            'start_time' => '2022-01-15 08:00:00',
            'end_time' => '2022-01-15 10:00:00'
        ]);

        // Create event outside date range
        Event::factory()->create([
            'start_time' => '2022-02-01 08:00:00',
            'end_time' => '2022-02-01 10:00:00'
        ]);

        $response = $this->getJson('/api/events?start_date=2022-01-01&end_date=2022-01-20');

        $response->assertStatus(200)
            ->assertJsonCount(2);
    }
}
