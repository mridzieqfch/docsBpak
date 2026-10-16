<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WebContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HeroImageController extends Controller
{
    public function index(): Response
    {
        $contents = WebContent::whereIn('section_key', [
            'hero_bg_image',
            'doc_bg_image',
            'news_bg_image',
            'panduan_bg_image',
            'faq_bg_image',
            'struct_manager_image',
            'struct_deputy1_image',
            'struct_deputy2_image',
        ])->pluck('content_text', 'section_key')->toArray();

        return Inertia::render('Admin/HeroImages/Index', [
            'images' => $contents,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'hero_bg_image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'doc_bg_image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'news_bg_image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'panduan_bg_image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'faq_bg_image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'struct_manager_image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'struct_deputy1_image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'struct_deputy2_image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',

            // Reset flags
            'reset_hero_bg_image' => 'nullable|boolean',
            'reset_doc_bg_image' => 'nullable|boolean',
            'reset_news_bg_image' => 'nullable|boolean',
            'reset_panduan_bg_image' => 'nullable|boolean',
            'reset_faq_bg_image' => 'nullable|boolean',
            'reset_struct_manager_image' => 'nullable|boolean',
            'reset_struct_deputy1_image' => 'nullable|boolean',
            'reset_struct_deputy2_image' => 'nullable|boolean',
        ]);

        $keys = [
            'hero_bg_image',
            'doc_bg_image',
            'news_bg_image',
            'panduan_bg_image',
            'faq_bg_image',
            'struct_manager_image',
            'struct_deputy1_image',
            'struct_deputy2_image',
        ];

        foreach ($keys as $key) {
            $resetKey = 'reset_'.$key;
            if ($request->boolean($resetKey)) {
                $oldPath = WebContent::where('section_key', $key)->value('content_text');
                if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
                WebContent::updateOrCreate(['section_key' => $key], ['content_text' => '']);

                continue;
            }

            if ($request->hasFile($key)) {
                // Delete old file if exists
                $oldPath = WebContent::where('section_key', $key)->value('content_text');
                if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }

                $file = $request->file($key);
                $path = $file->store('hero_images', 'public');

                WebContent::updateOrCreate(
                    ['section_key' => $key],
                    ['content_text' => $path]
                );
            }
        }

        return redirect()->back()->with('success', 'Gambar berhasil diperbarui.');
    }
}
