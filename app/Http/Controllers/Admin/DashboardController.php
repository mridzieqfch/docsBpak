<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\Category;
use App\Models\Document;
use App\Models\InboxMessage;
use App\Models\Page;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'document_count' => Document::count(),
                'unread_inbox_count' => InboxMessage::where('is_read', false)->count(),
                'announcement_count' => Announcement::count(),
                'category_count' => Category::count(),
                'page_count' => Page::count(),
            ],
            'recentInboxMessages' => InboxMessage::orderBy('created_at', 'desc')->take(5)->get(),
            'recentDocuments' => Document::with('category:id,name')->orderBy('created_at', 'desc')->take(5)->get(),
        ]);
    }
}
