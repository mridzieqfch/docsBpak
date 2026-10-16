<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Services\TranslationService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        $categories = Category::withCount('documents')->orderBy('order_number', 'asc')->get();

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_en' => 'nullable|string|max:255',
            'order_number' => 'nullable|integer',
        ]);

        $slug = Str::slug($validated['name']);
        $originalSlug = $slug;
        $count = 1;
        while (Category::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-".$count++;
        }

        $nameEn = ! empty($validated['name_en']) ? $validated['name_en'] : TranslationService::translate($validated['name']);

        Category::create([
            'name' => $validated['name'],
            'name_en' => $nameEn,
            'slug' => $slug,
            'order_number' => $validated['order_number'] ?? 0,
        ]);

        return redirect()->back()->with('success', 'Kategori dokumen berhasil ditambahkan.');
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_en' => 'nullable|string|max:255',
            'order_number' => 'nullable|integer',
        ]);

        if ($validated['name'] !== $category->name) {
            $slug = Str::slug($validated['name']);
            $originalSlug = $slug;
            $count = 1;
            while (Category::where('slug', $slug)->where('id', '!=', $category->id)->exists()) {
                $slug = "{$originalSlug}-".$count++;
            }
            $category->slug = $slug;
        }

        $category->name = $validated['name'];
        $category->name_en = ! empty($validated['name_en']) ? $validated['name_en'] : TranslationService::translate($validated['name']);
        $category->order_number = $validated['order_number'] ?? 0;
        $category->save();

        return redirect()->back()->with('success', 'Kategori dokumen berhasil diperbarui.');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->back()->with('success', 'Kategori dokumen berhasil dihapus.');
    }
}
