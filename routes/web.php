<?php

use App\Http\Controllers\Admin\AnnouncementController as AdminAnnouncementController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\DocumentController as AdminDocumentController;
use App\Http\Controllers\Admin\FaqController as AdminFaqController;
use App\Http\Controllers\Admin\HeroImageController as AdminHeroImageController;
use App\Http\Controllers\Admin\InboxMessageController as AdminInboxMessageController;
use App\Http\Controllers\Admin\PageController as AdminPageController;
use App\Http\Controllers\Admin\WebContentController as AdminWebContentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/', [PublicController::class, 'index'])->name('home');
Route::get('/dokumen', [PublicController::class, 'dokumen'])->name('dokumen');
Route::get('/dokumen/{document}', [PublicController::class, 'detailDocument'])->name('dokumen.detail');
Route::get('/dokumen/{document}/download', [PublicController::class, 'downloadDocument'])->name('dokumen.download');
Route::get('/pengumuman', [PublicController::class, 'pengumuman'])->name('pengumuman');
Route::get('/pengumuman/{slug}', [PublicController::class, 'detailAnnouncement'])->name('pengumuman.detail');
Route::get('/panduan', [PublicController::class, 'panduan'])->name('panduan');
Route::get('/faq', [PublicController::class, 'faq'])->name('faq');
Route::post('/faq/submit', [PublicController::class, 'submitMessage'])->name('faq.submit');
Route::get('/p/{slug}', [PublicController::class, 'page'])->name('page.detail');

/*
|--------------------------------------------------------------------------
| Admin Routes (Protected by Auth)
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return redirect()->route('admin.dashboard');
    });

    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    Route::resource('categories', AdminCategoryController::class)->except(['create', 'edit', 'show']);
    Route::resource('documents', AdminDocumentController::class)->except(['create', 'edit', 'show']);
    Route::resource('announcements', AdminAnnouncementController::class)->except(['create', 'edit', 'show']);
    Route::resource('faqs', AdminFaqController::class)->except(['create', 'edit', 'show']);

    Route::get('/inbox', [AdminInboxMessageController::class, 'index'])->name('inbox.index');
    Route::patch('/inbox/{inboxMessage}/read', [AdminInboxMessageController::class, 'markAsRead'])->name('inbox.mark-read');
    Route::delete('/inbox/{inboxMessage}', [AdminInboxMessageController::class, 'destroy'])->name('inbox.destroy');

    Route::get('/web-contents', [AdminWebContentController::class, 'index'])->name('web-contents.index');
    Route::post('/web-contents', [AdminWebContentController::class, 'update'])->name('web-contents.update');

    Route::get('/hero-images', [AdminHeroImageController::class, 'index'])->name('hero-images.index');
    Route::post('/hero-images', [AdminHeroImageController::class, 'update'])->name('hero-images.update');

    Route::resource('pages', AdminPageController::class)->except(['create', 'edit', 'show']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
