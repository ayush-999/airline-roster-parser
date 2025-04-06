<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition()
    {
        return [
            'type' => $this->faker->randomElement(['DO', 'SBY', 'FLT', 'CI', 'CO', 'UNK']),
            'start_time' => $this->faker->dateTimeBetween('-1 month', '+1 month'),
            'end_time' => $this->faker->dateTimeBetween('+1 hour', '+8 hours'),
            'location' => $this->faker->randomElement(['JFK', 'LAX', 'ORD', 'DFW', 'SFO']),
            'metadata' => null,
        ];
    }

    public function flight()
    {
        return $this->state([
            'type' => 'FLT',
        ]);
    }

    public function standby()
    {
        return $this->state([
            'type' => 'SBY',
        ]);
    }
}
