<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Event;
use App\Models\Standby;
use Carbon\Carbon;

class StandbyTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_standby_for_next_week()
    {
        $currentDate = Carbon::parse('2022-01-14');

        // Standby within next week
        $event1 = Event::factory()->standby()->create([
            'start_time' => $currentDate->copy()->addDays(1),
            'end_time' => $currentDate->copy()->addDays(1)->addHours(8)
        ]);

        Standby::factory()->create(['event_id' => $event1->id]);

        // Standby outside next week
        $event2 = Event::factory()->standby()->create([
            'start_time' => $currentDate->copy()->addDays(10),
            'end_time' => $currentDate->copy()->addDays(10)->addHours(8)
        ]);

        Standby::factory()->create(['event_id' => $event2->id]);

        $response = $this->getJson('/api/standby/next-week');

        $response->assertStatus(200)
            ->assertJsonCount(1);
    }
}
