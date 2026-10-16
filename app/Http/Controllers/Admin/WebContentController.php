<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WebContent;
use App\Services\TranslationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WebContentController extends Controller
{
    public function index(): Response
    {
        $contents = WebContent::pluck('content_text', 'section_key')->toArray();
        $contentsEn = WebContent::pluck('content_text_en', 'section_key')->toArray();

        return Inertia::render('Admin/WebContents/Index', [
            'contents' => $contents,
            'contentsEn' => $contentsEn,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'contents' => 'required|array',
            'contents.*' => 'nullable|string',
            'contents_en' => 'nullable|array',
            'contents_en.*' => 'nullable|string',
        ]);

        $contentsEn = $validated['contents_en'] ?? [];

        $existingRecords = WebContent::whereIn('section_key', array_keys($validated['contents']))
            ->get()
            ->keyBy('section_key');

        foreach ($validated['contents'] as $key => $text) {
            $textStr = $text ?? '';
            $providedEn = $contentsEn[$key] ?? null;

            $existing = $existingRecords->get($key);

            if (! empty($providedEn)) {
                $textEn = $providedEn;
            } elseif ($existing && $existing->content_text === $textStr && ! empty($existing->content_text_en)) {
                $textEn = $existing->content_text_en;
            } else {
                $translated = TranslationService::translate($textStr);
                if (($translated === $textStr || empty($translated)) && $existing && ! empty($existing->content_text_en) && $existing->content_text_en !== $existing->content_text) {
                    $textEn = $existing->content_text_en;
                } else {
                    $textEn = $translated;
                }
            }

            WebContent::updateOrCreate(
                ['section_key' => $key],
                [
                    'content_text' => $textStr,
                    'content_text_en' => $textEn,
                ]
            );
        }

        return redirect()->back()->with('success', 'Konten website berhasil diperbarui.');
    }
}
