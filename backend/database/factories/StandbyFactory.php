<?php

namespace Database\Factories;

use App\Models\Standby;
use Illuminate\Database\Eloquent\Factories\Factory;

class StandbyFactory extends Factory
{
    protected $model = Standby::class;

    public function definition()
    {
        return [
            'duration' => $this->faker->numberBetween(1, 8) . ' hours',
        ];
    }
}
