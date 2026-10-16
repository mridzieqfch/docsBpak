<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\WebContent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WebContentTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_update_web_contents_without_redundant_translations(): void
    {
        $user = User::factory()->create();

        // Seed initial content
        WebContent::create([
            'section_key' => 'visi_text',
            'content_text' => 'Visi awal',
            'content_text_en' => 'Initial vision',
        ]);
        WebContent::create([
            'section_key' => 'misi_text',
            'content_text' => 'Misi awal',
            'content_text_en' => 'Initial mission',
        ]);

        $response = $this
            ->actingAs($user)
            ->post(route('admin.web-contents.update'), [
                'contents' => [
                    'visi_text' => 'Visi awal', // Unchanged
                    'misi_text' => 'Misi baru yang diubah', // Changed
                ],
            ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect();

        // Verify unchanged key kept its existing translation
        $this->assertDatabaseHas('web_contents', [
            'section_key' => 'visi_text',
            'content_text' => 'Visi awal',
            'content_text_en' => 'Initial vision',
        ]);

        // Verify changed key updated content_text
        $this->assertDatabaseHas('web_contents', [
            'section_key' => 'misi_text',
            'content_text' => 'Misi baru yang diubah',
        ]);
    }

    public function test_admin_can_update_all_web_contents_from_empty_db_swiftly(): void
    {
        $user = User::factory()->create();

        $startTime = microtime(true);

        $response = $this
            ->actingAs($user)
            ->post(route('admin.web-contents.update'), [
                'contents' => [
                    'hero_title' => 'Title 1',
                    'hero_subtitle' => 'Subtitle 1',
                    'doc_hero_tag' => 'Tag 1',
                    'doc_hero_title' => 'Title 2',
                    'doc_hero_subtitle' => 'Subtitle 2',
                    'news_hero_tag' => 'Tag 2',
                    'news_hero_title' => 'Title 3',
                    'news_hero_subtitle' => 'Subtitle 3',
                    'panduan_hero_tag' => 'Tag 3',
                    'panduan_hero_title' => 'Title 4',
                    'panduan_hero_subtitle' => 'Subtitle 4',
                    'visi_text' => 'Visi Kami',
                    'misi_text' => 'Misi Kami',
                    'contact_email' => 'test@test.com',
                ],
            ]);

        $duration = microtime(true) - $startTime;

        $response->assertSessionHasNoErrors();
        $response->assertRedirect();

        // Must complete well under 30 seconds (circuit breaker ensures it finishes in < 5 seconds even with network failures)
        $this->assertLessThan(5.0, $duration);
    }
}
