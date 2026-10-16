<?php

namespace App\Console\Commands;

use App\Models\Announcement;
use App\Models\Category;
use App\Models\Document;
use App\Models\Faq;
use App\Models\Page;
use App\Models\WebContent;
use App\Services\TranslationService;
use Illuminate\Console\Command;

class TranslateExistingContent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'content:translate-all {--force : Force re-translation even if _en fields are already set}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Auto translate all existing dynamic database content to English';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $force = $this->option('force');
        $this->info('Starting auto-translation of existing database records...');

        // Helper check
        $shouldTranslate = function (?string $enText, ?string $origText) use ($force): bool {
            if ($force) {
                return true;
            }
            if (empty($enText)) {
                return true;
            }
            if (! empty($origText) && $enText === $origText) {
                return true;
            }

            return false;
        };

        // 1. Categories
        $this->info('Translating Categories...');
        foreach (Category::all() as $category) {
            if ($shouldTranslate($category->name_en, $category->name)) {
                $category->name_en = TranslationService::translate($category->name);
                $category->save();
            }
        }

        // 2. Documents
        $this->info('Translating Documents...');
        foreach (Document::all() as $document) {
            if ($shouldTranslate($document->title_en, $document->title)) {
                $document->title_en = TranslationService::translate($document->title);
                $document->save();
            }
        }

        // 3. Announcements
        $this->info('Translating Announcements...');
        foreach (Announcement::all() as $announcement) {
            if ($shouldTranslate($announcement->title_en, $announcement->title)) {
                $announcement->title_en = TranslationService::translate($announcement->title);
            }
            if ($shouldTranslate($announcement->excerpt_en, $announcement->excerpt) && ! empty($announcement->excerpt)) {
                $announcement->excerpt_en = TranslationService::translate($announcement->excerpt);
            }
            if ($shouldTranslate($announcement->content_en, $announcement->content) && ! empty($announcement->content)) {
                $announcement->content_en = TranslationService::translate($announcement->content);
            }
            $announcement->save();
        }

        // 4. FAQs
        $this->info('Translating FAQs...');
        foreach (Faq::all() as $faq) {
            if ($shouldTranslate($faq->question_en, $faq->question)) {
                $faq->question_en = TranslationService::translate($faq->question);
            }
            if ($shouldTranslate($faq->answer_en, $faq->answer)) {
                $faq->answer_en = TranslationService::translate($faq->answer);
            }
            $faq->save();
        }

        // 5. Pages
        $this->info('Translating Pages...');
        foreach (Page::all() as $page) {
            if ($shouldTranslate($page->title_en, $page->title)) {
                $page->title_en = TranslationService::translate($page->title);
            }
            if ($shouldTranslate($page->content_en, $page->content) && ! empty($page->content)) {
                $page->content_en = TranslationService::translate($page->content);
            }
            $page->save();
        }

        // 6. WebContents
        $this->info('Translating WebContents...');
        foreach (WebContent::all() as $webContent) {
            if ($shouldTranslate($webContent->content_text_en, $webContent->content_text) && ! empty($webContent->content_text)) {
                $webContent->content_text_en = TranslationService::translate($webContent->content_text);
                $webContent->save();
            }
        }

        $this->info('Auto-translation completed successfully!');

        return Command::SUCCESS;
    }
}
