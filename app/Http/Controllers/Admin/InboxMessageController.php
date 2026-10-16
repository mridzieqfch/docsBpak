<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InboxMessage;
use Inertia\Inertia;
use Inertia\Response;

class InboxMessageController extends Controller
{
    public function index(): Response
    {
        $messages = InboxMessage::orderBy('is_read', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Inbox/Index', [
            'messages' => $messages,
        ]);
    }

    public function markAsRead(InboxMessage $inboxMessage)
    {
        $inboxMessage->update(['is_read' => true]);

        return redirect()->back()->with('success', 'Pesan ditandai sebagai sudah dibaca.');
    }

    public function destroy(InboxMessage $inboxMessage)
    {
        $inboxMessage->delete();

        return redirect()->back()->with('success', 'Pesan berhasil dihapus.');
    }
}
