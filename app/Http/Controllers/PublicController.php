<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Category;
use App\Models\Document;
use App\Models\Faq;
use App\Models\InboxMessage;
use App\Models\Page;
use App\Models\WebContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    private function getNavbarPages()
    {
        return Page::where('show_in_navbar', true)->orderBy('title', 'asc')->get(['id', 'title', 'title_en', 'slug']);
    }

    private function getWebContents(): array
    {
        return WebContent::pluck('content_text', 'section_key')->toArray();
    }

    private function getWebContentsEn(): array
    {
        return WebContent::pluck('content_text_en', 'section_key')->toArray();
    }

    public function index(): Response
    {
        $categories = Category::with(['documents' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }])->orderBy('order_number', 'asc')->get();

        $latestAnnouncements = Announcement::orderBy('published_at', 'desc')->take(3)->get();

        return Inertia::render('Home', [
            'webContents' => $this->getWebContents(),
            'webContentsEn' => $this->getWebContentsEn(),
            'categories' => $categories,
            'latestAnnouncements' => $latestAnnouncements,
            'navbarPages' => $this->getNavbarPages(),
        ]);
    }

    public function dokumen(): Response
    {
        $categories = Category::with(['documents' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }])->orderBy('order_number', 'asc')->get();

        return Inertia::render('Dokumen', [
            'categories' => $categories,
            'webContents' => $this->getWebContents(),
            'webContentsEn' => $this->getWebContentsEn(),
            'navbarPages' => $this->getNavbarPages(),
        ]);
    }

    public function downloadDocument(Document $document)
    {
        $document->increment('download_count');

        if (Storage::disk('public')->exists($document->file_path)) {
            return Storage::disk('public')->download($document->file_path, $document->title.'.'.pathinfo($document->file_path, PATHINFO_EXTENSION));
        }

        return redirect()->back()->with('error', 'File tidak ditemukan di server.');
    }

    public function detailDocument(Document $document): Response
    {
        $document->load(['category', 'uploader']);

        $relatedDocuments = Document::with('category')
            ->where('id', '!=', $document->id)
            ->where('category_id', $document->category_id)
            ->limit(4)
            ->get();

        if ($relatedDocuments->isEmpty()) {
            $relatedDocuments = Document::with('category')
                ->where('id', '!=', $document->id)
                ->limit(4)
                ->get();
        }

        return Inertia::render('DokumenDetail', [
            'document' => $document,
            'relatedDocuments' => $relatedDocuments,
            'navbarPages' => $this->getNavbarPages(),
        ]);
    }

    public function pengumuman(Request $request): Response
    {
        $query = Announcement::with('author:id,name')->orderBy('published_at', 'desc');

        if ($request->filled('tag') && $request->tag !== 'Semua') {
            $query->where('tag_category', $request->tag);
        }

        $announcements = $query->paginate(9)->withQueryString();

        return Inertia::render('Pengumuman', [
            'announcements' => $announcements,
            'currentTag' => $request->tag ?? 'Semua',
            'webContents' => $this->getWebContents(),
            'webContentsEn' => $this->getWebContentsEn(),
            'navbarPages' => $this->getNavbarPages(),
        ]);
    }

    public function detailAnnouncement(string $slug): Response
    {
        $announcement = Announcement::with('author:id,name')->where('slug', $slug)->firstOrFail();
        $recentAnnouncements = Announcement::where('id', '!=', $announcement->id)->orderBy('published_at', 'desc')->take(4)->get();

        return Inertia::render('PengumumanDetail', [
            'announcement' => $announcement,
            'latestAnnouncements' => $recentAnnouncements,
            'navbarPages' => $this->getNavbarPages(),
        ]);
    }

    public function panduan(): Response
    {
        $guideDocuments = Document::with('category')
            ->limit(6)
            ->get();

        return Inertia::render('Panduan', [
            'guideDocuments' => $guideDocuments,
            'webContents' => $this->getWebContents(),
            'webContentsEn' => $this->getWebContentsEn(),
            'navbarPages' => $this->getNavbarPages(),
        ]);
    }

    public function faq(): Response
    {
        $faqs = Faq::orderBy('order_number', 'asc')->get();

        return Inertia::render('Faq', [
            'faqs' => $faqs,
            'webContents' => $this->getWebContents(),
            'webContentsEn' => $this->getWebContentsEn(),
            'navbarPages' => $this->getNavbarPages(),
        ]);
    }

    public function submitMessage(Request $request)
    {
        $validated = $request->validate([
            'sender_name' => 'required|string|max:255',
            'sender_id_number' => 'required|string|max:100',
            'question_category' => 'required|string|max:255',
            'message_body' => 'required|string',
        ]);

        InboxMessage::create([
            'sender_name' => $validated['sender_name'],
            'sender_id_number' => $validated['sender_id_number'],
            'question_category' => $validated['question_category'],
            'message_body' => $validated['message_body'],
            'is_read' => false,
        ]);

        return redirect()->back()->with('success', 'Pesan Anda telah berhasil dikirim! Tim BPAK ITPLN akan menindaklanjuti pertanyaan Anda.');
    }

    public function page(string $slug): Response
    {
        $page = Page::with('author:id,name')->where('slug', $slug)->firstOrFail();

        return Inertia::render('PageDetail', [
            'page' => $page,
            'navbarPages' => $this->getNavbarPages(),
        ]);
    }
}
