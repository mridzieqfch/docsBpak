<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\WebContent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class HeroImageTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_access_hero_images_page(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get(route('admin.hero-images.index'));

        $response->assertOk();
    }

    public function test_admin_can_update_structural_and_hero_images(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $heroFile = UploadedFile::fake()->image('hero.jpg');
        $managerFile = UploadedFile::fake()->image('manager.jpg');

        $response = $this
            ->actingAs($user)
            ->post(route('admin.hero-images.update'), [
                'hero_bg_image' => $heroFile,
                'struct_manager_image' => $managerFile,
            ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect();

        $managerPath = WebContent::where('section_key', 'struct_manager_image')->value('content_text');
        $this->assertNotEmpty($managerPath);
        Storage::disk('public')->assertExists($managerPath);

        $heroPath = WebContent::where('section_key', 'hero_bg_image')->value('content_text');
        $this->assertNotEmpty($heroPath);
        Storage::disk('public')->assertExists($heroPath);
    }

    public function test_admin_can_reset_images(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        WebContent::create([
            'section_key' => 'struct_manager_image',
            'content_text' => 'hero_images/old_manager.jpg',
        ]);
        Storage::disk('public')->put('hero_images/old_manager.jpg', 'fake content');

        $response = $this
            ->actingAs($user)
            ->post(route('admin.hero-images.update'), [
                'reset_struct_manager_image' => true,
            ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect();

        $this->assertDatabaseHas('web_contents', [
            'section_key' => 'struct_manager_image',
            'content_text' => '',
        ]);
        Storage::disk('public')->assertMissing('hero_images/old_manager.jpg');
    }
}
