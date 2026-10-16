<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('announcements', function (Blueprint $table) {
            $table->string('title_en')->nullable()->after('title');
            $table->text('excerpt_en')->nullable()->after('excerpt');
            $table->longText('content_en')->nullable()->after('content');
        });

        Schema::table('documents', function (Blueprint $table) {
            $table->string('title_en')->nullable()->after('title');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->string('name_en')->nullable()->after('name');
        });

        Schema::table('faqs', function (Blueprint $table) {
            $table->string('question_en')->nullable()->after('question');
            $table->text('answer_en')->nullable()->after('answer');
        });

        Schema::table('pages', function (Blueprint $table) {
            $table->string('title_en')->nullable()->after('title');
            $table->longText('content_en')->nullable()->after('content');
        });

        Schema::table('web_contents', function (Blueprint $table) {
            $table->text('content_text_en')->nullable()->after('content_text');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('announcements', function (Blueprint $table) {
            $table->dropColumn(['title_en', 'excerpt_en', 'content_en']);
        });

        Schema::table('documents', function (Blueprint $table) {
            $table->dropColumn(['title_en']);
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn(['name_en']);
        });

        Schema::table('faqs', function (Blueprint $table) {
            $table->dropColumn(['question_en', 'answer_en']);
        });

        Schema::table('pages', function (Blueprint $table) {
            $table->dropColumn(['title_en', 'content_en']);
        });

        Schema::table('web_contents', function (Blueprint $table) {
            $table->dropColumn(['content_text_en']);
        });
    }
};
