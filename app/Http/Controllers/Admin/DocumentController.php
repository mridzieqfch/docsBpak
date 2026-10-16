<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Document;
use App\Services\TranslationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class DocumentController extends Controller
{
    public function index(): Response
    {
        $documents = Document::with(['category:id,name,name_en', 'uploader:id,name'])
            ->orderBy('created_at', 'desc')
            ->get();

        $categories = Category::orderBy('name', 'asc')->get(['id', 'name', 'name_en']);

        return Inertia::render('Admin/Documents/Index', [
            'documents' => $documents,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'academic_year' => 'required|string|max:50',
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx|max:10240',
        ]);

        $file = $request->file('file');
        $extension = strtoupper($file->getClientOriginalExtension());
        $sizeBytes = $file->getSize();
        $formattedSize = $this->formatFileSize($sizeBytes);

        $path = $file->store('documents', 'public');

        $titleEn = ! empty($validated['title_en']) ? $validated['title_en'] : TranslationService::translate($validated['title']);

        Document::create([
            'category_id' => $validated['category_id'],
            'uploader_id' => $request->user()->id,
            'title' => $validated['title'],
            'title_en' => $titleEn,
            'file_path' => $path,
            'file_type' => $extension,
            'file_size' => $formattedSize,
            'academic_year' => $validated['academic_year'],
            'download_count' => 0,
        ]);

        return redirect()->back()->with('success', 'Dokumen berhasil diunggah.');
    }

    public function update(Request $request, Document $document)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'academic_year' => 'required|string|max:50',
            'file' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx|max:10240',
        ]);

        if ($request->hasFile('file')) {
            // Delete old file
            if (Storage::disk('public')->exists($document->file_path)) {
                Storage::disk('public')->delete($document->file_path);
            }

            $file = $request->file('file');
            $extension = strtoupper($file->getClientOriginalExtension());
            $sizeBytes = $file->getSize();
            $formattedSize = $this->formatFileSize($sizeBytes);

            $path = $file->store('documents', 'public');

            $document->file_path = $path;
            $document->file_type = $extension;
            $document->file_size = $formattedSize;
        }

        $document->title = $validated['title'];
        $document->title_en = ! empty($validated['title_en']) ? $validated['title_en'] : TranslationService::translate($validated['title']);
        $document->category_id = $validated['category_id'];
        $document->academic_year = $validated['academic_year'];
        $document->save();

        return redirect()->back()->with('success', 'Dokumen berhasil diperbarui.');
    }

    public function destroy(Document $document)
    {
        if (Storage::disk('public')->exists($document->file_path)) {
            Storage::disk('public')->delete($document->file_path);
        }

        $document->delete();

        return redirect()->back()->with('success', 'Dokumen berhasil dihapus.');
    }

    private function formatFileSize(int $bytes): string
    {
        if ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 1).' MB';
        } elseif ($bytes >= 1024) {
            return number_format($bytes / 1024, 1).' KB';
        }

        return $bytes.' B';
    }
}
