<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Services\TranslationService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function index(): Response
    {
        $pages = Page::with('author:id,name')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Pages/Index', [
            'pages' => $pages,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'content' => 'required|string',
            'content_en' => 'nullable|string',
            'show_in_navbar' => 'boolean',
        ]);

        $slug = Str::slug($validated['title']);
        $originalSlug = $slug;
        $count = 1;
        while (Page::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-".$count++;
        }

        $titleEn = ! empty($validated['title_en']) ? $validated['title_en'] : TranslationService::translate($validated['title']);
        $contentEn = ! empty($validated['content_en']) ? $validated['content_en'] : TranslationService::translate($validated['content']);

        Page::create([
            'author_id' => $request->user()->id,
            'title' => $validated['title'],
            'title_en' => $titleEn,
            'slug' => $slug,
            'content' => $validated['content'],
            'content_en' => $contentEn,
            'show_in_navbar' => $validated['show_in_navbar'] ?? false,
        ]);

        return redirect()->back()->with('success', 'Halaman dinamis berhasil dibuat.');
    }

    public function update(Request $request, Page $page)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'content' => 'required|string',
            'content_en' => 'nullable|string',
            'show_in_navbar' => 'boolean',
        ]);

        if ($validated['title'] !== $page->title) {
            $slug = Str::slug($validated['title']);
            $originalSlug = $slug;
            $count = 1;
            while (Page::where('slug', $slug)->where('id', '!=', $page->id)->exists()) {
                $slug = "{$originalSlug}-".$count++;
            }
            $page->slug = $slug;
        }

        $page->title = $validated['title'];
        $page->title_en = ! empty($validated['title_en']) ? $validated['title_en'] : TranslationService::translate($validated['title']);
        $page->content = $validated['content'];
        $page->content_en = ! empty($validated['content_en']) ? $validated['content_en'] : TranslationService::translate($validated['content']);
        $page->show_in_navbar = $validated['show_in_navbar'] ?? false;
        $page->save();

        return redirect()->back()->with('success', 'Halaman dinamis berhasil diperbarui.');
    }

    public function destroy(Page $page)
    {
        $page->delete();

        return redirect()->back()->with('success', 'Halaman dinamis berhasil dihapus.');
    }
}
