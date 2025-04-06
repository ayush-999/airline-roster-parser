<?php

namespace Database\Factories;

use App\Models\Flight;
use Illuminate\Database\Eloquent\Factories\Factory;

class FlightFactory extends Factory
{
    protected $model = Flight::class;

    public function definition()
    {
        return [
            'flight_number' => $this->faker->regexify('[A-Z]{2}\d{3}'),
            'departure_airport' => $this->faker->randomElement(['JFK', 'LAX', 'ORD', 'DFW', 'SFO']),
            'arrival_airport' => $this->faker->randomElement(['JFK', 'LAX', 'ORD', 'DFW', 'SFO']),
        ];
    }
}
