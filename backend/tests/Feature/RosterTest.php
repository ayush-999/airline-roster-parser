<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class RosterTest extends TestCase
{
    public function test_roster_upload()
    {
        Storage::fake('rosters');

        // Create a text file instead of PDF for testing
        $content = "DO 2022-01-10 00:00 23:59 HOME\n" .
            "SBY 2022-01-11 08:00 16:00 JFK\n" .
            "FLT DX77 2022-01-12 08:00 10:00 JFK LAX\n" .
            "CI 2022-01-12 07:00 07:30 JFK\n" .
            "CO 2022-01-12 10:30 11:00 LAX";

        $file = UploadedFile::fake()->createWithContent(
            'roster.txt',
            $content
        );

        $response = $this->postJson('/api/roster/upload', [
            'roster' => $file
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure(['message', 'events_processed'])
            ->assertJson(['events_processed' => 5]);
    }

    public function test_invalid_file_upload()
    {
        $file = UploadedFile::fake()->create('roster.jpg', 100);

        $response = $this->postJson('/api/roster/upload', [
            'roster' => $file
        ]);

        $response->assertStatus(422);
    }
}
