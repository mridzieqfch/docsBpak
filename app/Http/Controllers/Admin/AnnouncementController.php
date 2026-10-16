<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Services\TranslationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementController extends Controller
{
    public function index(): Response
    {
        $announcements = Announcement::with('author:id,name')
            ->orderBy('published_at', 'desc')
            ->get();

        return Inertia::render('Admin/Announcements/Index', [
            'announcements' => $announcements,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'tag_category' => 'required|string|max:100',
            'excerpt' => 'nullable|string',
            'excerpt_en' => 'nullable|string',
            'content' => 'required|string',
            'content_en' => 'nullable|string',
            'published_at' => 'nullable|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $slug = Str::slug($validated['title']);
        $originalSlug = $slug;
        $count = 1;
        while (Announcement::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-".$count++;
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('announcements', 'public');
        }

        $titleEn = ! empty($validated['title_en']) ? $validated['title_en'] : TranslationService::translate($validated['title']);
        $contentEn = ! empty($validated['content_en']) ? $validated['content_en'] : TranslationService::translate($validated['content']);
        $excerpt = $validated['excerpt'] ?? Str::limit(strip_tags($validated['content']), 150);
        $excerptEn = ! empty($validated['excerpt_en']) ? $validated['excerpt_en'] : TranslationService::translate($excerpt);

        Announcement::create([
            'author_id' => $request->user()->id,
            'title' => $validated['title'],
            'title_en' => $titleEn,
            'slug' => $slug,
            'tag_category' => $validated['tag_category'],
            'excerpt' => $excerpt,
            'excerpt_en' => $excerptEn,
            'content' => $validated['content'],
            'content_en' => $contentEn,
            'image_path' => $imagePath,
            'published_at' => $validated['published_at'] ?? now(),
        ]);

        return redirect()->back()->with('success', 'Pengumuman berhasil dipublikasikan.');
    }

    public function update(Request $request, Announcement $announcement)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'tag_category' => 'required|string|max:100',
            'excerpt' => 'nullable|string',
            'excerpt_en' => 'nullable|string',
            'content' => 'required|string',
            'content_en' => 'nullable|string',
            'published_at' => 'nullable|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($validated['title'] !== $announcement->title) {
            $slug = Str::slug($validated['title']);
            $originalSlug = $slug;
            $count = 1;
            while (Announcement::where('slug', $slug)->where('id', '!=', $announcement->id)->exists()) {
                $slug = "{$originalSlug}-".$count++;
            }
            $announcement->slug = $slug;
        }

        if ($request->hasFile('image')) {
            if ($announcement->image_path && Storage::disk('public')->exists($announcement->image_path)) {
                Storage::disk('public')->delete($announcement->image_path);
            }
            $announcement->image_path = $request->file('image')->store('announcements', 'public');
        }

        $excerpt = $validated['excerpt'] ?? Str::limit(strip_tags($validated['content']), 150);

        $announcement->title = $validated['title'];
        $announcement->title_en = ! empty($validated['title_en']) ? $validated['title_en'] : TranslationService::translate($validated['title']);
        $announcement->tag_category = $validated['tag_category'];
        $announcement->excerpt = $excerpt;
        $announcement->excerpt_en = ! empty($validated['excerpt_en']) ? $validated['excerpt_en'] : TranslationService::translate($excerpt);
        $announcement->content = $validated['content'];
        $announcement->content_en = ! empty($validated['content_en']) ? $validated['content_en'] : TranslationService::translate($validated['content']);
        $announcement->published_at = $validated['published_at'] ?? $announcement->published_at;
        $announcement->save();

        return redirect()->back()->with('success', 'Pengumuman berhasil diperbarui.');
    }

    public function destroy(Announcement $announcement)
    {
        if ($announcement->image_path && Storage::disk('public')->exists($announcement->image_path)) {
            Storage::disk('public')->delete($announcement->image_path);
        }

        $announcement->delete();

        return redirect()->back()->with('success', 'Pengumuman berhasil dihapus.');
    }
}
