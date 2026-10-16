<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Services\TranslationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    public function index(): Response
    {
        $faqs = Faq::orderBy('order_number', 'asc')->get();

        return Inertia::render('Admin/Faqs/Index', [
            'faqs' => $faqs,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'question_en' => 'nullable|string|max:255',
            'answer' => 'required|string',
            'answer_en' => 'nullable|string',
            'order_number' => 'nullable|integer',
        ]);

        $questionEn = ! empty($validated['question_en']) ? $validated['question_en'] : TranslationService::translate($validated['question']);
        $answerEn = ! empty($validated['answer_en']) ? $validated['answer_en'] : TranslationService::translate($validated['answer']);

        Faq::create([
            'question' => $validated['question'],
            'question_en' => $questionEn,
            'answer' => $validated['answer'],
            'answer_en' => $answerEn,
            'order_number' => $validated['order_number'] ?? 0,
        ]);

        return redirect()->back()->with('success', 'FAQ berhasil ditambahkan.');
    }

    public function update(Request $request, Faq $faq)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'question_en' => 'nullable|string|max:255',
            'answer' => 'required|string',
            'answer_en' => 'nullable|string',
            'order_number' => 'nullable|integer',
        ]);

        $questionEn = ! empty($validated['question_en']) ? $validated['question_en'] : TranslationService::translate($validated['question']);
        $answerEn = ! empty($validated['answer_en']) ? $validated['answer_en'] : TranslationService::translate($validated['answer']);

        $faq->update([
            'question' => $validated['question'],
            'question_en' => $questionEn,
            'answer' => $validated['answer'],
            'answer_en' => $answerEn,
            'order_number' => $validated['order_number'] ?? 0,
        ]);

        return redirect()->back()->with('success', 'FAQ berhasil diperbarui.');
    }

    public function destroy(Faq $faq)
    {
        $faq->delete();

        return redirect()->back()->with('success', 'FAQ berhasil dihapus.');
    }
}
