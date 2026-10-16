<?php

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\Category;
use App\Models\Document;
use App\Models\Faq;
use App\Models\InboxMessage;
use App\Models\Page;
use App\Models\User;
use App\Models\WebContent;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Superadmin User
        $admin = User::updateOrCreate(
            ['email' => 'bpak@itpln.ac.id'],
            [
                'name' => 'Administrator BPAK',
                'password' => Hash::make('password'),
                'role' => 'superadmin',
            ]
        );

        // 2. Create Web Contents
        $webContentItems = [
            'hero_title' => 'Bagian Pengembangan Akademik',
            'hero_subtitle' => 'Mengembangkan dan mengawal mutu kurikulum pendidikan tinggi yang adaptif, inovatif, dan berstandar internasional di Institut Teknologi PLN.',
            'visi_text' => 'Menjadi pusat pengembangan kurikulum pendidikan tinggi yang adaptif, inovatif, dan bereputasi internasional dalam mendukung terciptanya ekosistem akademik yang bermutu tinggi pada tahun 2030.',
            'misi_text' => "1. Merumuskan kebijakan standar kurikulum berstandar internasional (OBE).\n2. Mengawal implementasi Merdeka Belajar Kampus Merdeka (MBKM).\n3. Mendampingi program studi dalam evaluasi dan pemutakhiran Rencana Pembelajaran.",
            'contact_email' => 'bpak@itpln.ac.id',
            'contact_address' => 'Menara PLN, Jl. Lkr. Luar Barat, Cengkareng, Jakarta Barat 11750',
            'contact_location' => 'Lantai Mezzanine Lobi Utara',
        ];

        foreach ($webContentItems as $key => $val) {
            WebContent::updateOrCreate(
                ['section_key' => $key],
                ['content_text' => $val]
            );
        }

        // 3. Create Categories & Documents
        $cat1 = Category::updateOrCreate(['slug' => 'kurikulum'], ['name' => 'Kurikulum', 'order_number' => 1]);
        $cat2 = Category::updateOrCreate(['slug' => 'kampus-berdampak'], ['name' => 'Kampus Berdampak', 'order_number' => 2]);
        $cat3 = Category::updateOrCreate(['slug' => 'rpl'], ['name' => 'RPL', 'order_number' => 3]);
        $cat4 = Category::updateOrCreate(['slug' => 'umum'], ['name' => 'Umum', 'order_number' => 4]);

        Document::updateOrCreate(
            ['title' => 'Pedoman Kurikulum OBE 2026'],
            [
                'category_id' => $cat1->id,
                'uploader_id' => $admin->id,
                'file_path' => 'documents/sample_pedoman_kurikulum_obe.pdf',
                'file_type' => 'PDF',
                'file_size' => '2.4 MB',
                'academic_year' => '2026/2027',
                'download_count' => 142,
            ]
        );

        Document::updateOrCreate(
            ['title' => 'Buku Struktur Kurikulum Sarjana 2026'],
            [
                'category_id' => $cat1->id,
                'uploader_id' => $admin->id,
                'file_path' => 'documents/sample_struktur_kurikulum.pdf',
                'file_type' => 'PDF',
                'file_size' => '1.8 MB',
                'academic_year' => '2026/2027',
                'download_count' => 98,
            ]
        );

        Document::updateOrCreate(
            ['title' => 'Panduan Program Kampus Berdampak & Magang Industri 2026'],
            [
                'category_id' => $cat2->id,
                'uploader_id' => $admin->id,
                'file_path' => 'documents/sample_panduan_kampus_berdampak.pdf',
                'file_type' => 'PDF',
                'file_size' => '3.1 MB',
                'academic_year' => '2026/2027',
                'download_count' => 310,
            ]
        );

        Document::updateOrCreate(
            ['title' => 'Pedoman Rekognisi Pembelajaran Lampau (RPL) Akademik'],
            [
                'category_id' => $cat3->id,
                'uploader_id' => $admin->id,
                'file_path' => 'documents/sample_pedoman_rpl.pdf',
                'file_type' => 'PDF',
                'file_size' => '2.1 MB',
                'academic_year' => '2026/2027',
                'download_count' => 185,
            ]
        );

        Document::updateOrCreate(
            ['title' => 'Pedoman Penulisan Tugas Akhir & Kalender Akademik Umum'],
            [
                'category_id' => $cat4->id,
                'uploader_id' => $admin->id,
                'file_path' => 'documents/sample_pedoman_umum.pdf',
                'file_type' => 'PDF',
                'file_size' => '1.5 MB',
                'academic_year' => '2026/2027',
                'download_count' => 220,
            ]
        );

        // 4. Create FAQs
        $faqsData = [
            [
                'question' => 'Bagaimana prosedur peninjauan kurikulum baru oleh Program Studi?',
                'answer' => 'Program Studi menyusun draf dokumen evaluasi kurikulum dan RPS, lalu mengajukan permohonan reviu ke Bagian Pengembangan Akademik (BPAK) melalui formulir resmi.',
                'order_number' => 1,
            ],
            [
                'question' => 'Di mana saya bisa mengunduh template Rencana Pembelajaran Semester (RPS) OBE?',
                'answer' => 'Template RPS berbasis Outcome-Based Education (OBE) dapat diunduh pada menu Repositori Dokumen kategori Regulasi & Pedoman Umum.',
                'order_number' => 2,
            ],
            [
                'question' => 'Apakah konversi SKS program MBKM ditangani langsung oleh BPAK?',
                'answer' => 'BPAK menyediakan petunjuk teknis dan matriks ekuivalensi. Penetapan konversi nilai dilakukan oleh Tim MBKM Fakultas bersama Ketua Program Studi.',
                'order_number' => 3,
            ],
        ];

        foreach ($faqsData as $faq) {
            Faq::updateOrCreate(['question' => $faq['question']], $faq);
        }

        // 5. Create Announcements
        $announcementsData = [
            [
                'title' => 'Sosialisasi Pemutakhiran Kurikulum Berbasis OBE Semester Gasal 2024/2025',
                'slug' => 'sosialisasi-pemutakhiran-kurikulum-obe-2024',
                'tag_category' => 'Kurikulum',
                'excerpt' => 'BPAK ITPLN menyelenggarakan sosialisasi pedoman penyusunan RPS berbasis OBE bagi seluruh dosen pengampu mata kuliah.',
                'content' => '<p>Bagian Pengembangan Akademik (BPAK) IT-PLN akan mengadakan agenda sosialisasi penyesuaian Rencana Pembelajaran Semester (RPS) berbasis Outcome-Based Education (OBE). Kegiatan ini bertujuan memastikan seluruh Capaian Pembelajaran Lulusan (CPL) dan Capaian Pembelajaran Mata Kuliah (CPMK) terukur sesuai standar acuan SN-Dikti dan akreditasi internasional.</p><p>Acara dilaksanakan secara hybrid di Auditorium Menara PLN dan Zoom Meeting pada hari Selasa minggu depan.</p>',
                'published_at' => now()->subDays(2),
            ],
            [
                'title' => 'Pembukaan Pendaftaran Program MBKM Mandiri Semester Gasal',
                'slug' => 'pembukaan-pendaftaran-mbkm-mandiri-gasal',
                'tag_category' => 'MBKM',
                'excerpt' => 'Pengajuan rekomendasi MBKM Mandiri magang industri dan studi independen telah dibuka hingga akhir bulan.',
                'content' => '<p>Bagi mahasiswa yang berencana mengikuti MBKM Mandiri Mitra Industri Mitra ITPLN, pendaftaran dan pengunggahan berkas persyaratan surat rekomendasi telah dibuka. Pastikan memilih program yang terakreditasi dan relevan dengan capaian kurikulum prodi.</p>',
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Pedoman Rekognisi Pembelajaran Lampau (RPL) Terbaru Telah Diterbitkan',
                'slug' => 'pedoman-rpl-terbaru-diterbitkan',
                'tag_category' => 'RPL',
                'excerpt' => 'BPAK merilis panduan pengakuan pengalaman kerja dan sertifikasi profesional untuk mahasiswa alur RPL.',
                'content' => '<p>Panduan terbaru Rekognisi Pembelajaran Lampau (RPL) Tipe A dan Tipe B resmi disahkan. Panduan ini memuat kriteria portofolio, asesmen mandiri, dan mekanisme pengakuan kredit mata kuliah secara transparan.</p>',
                'published_at' => now()->subDays(10),
            ],
        ];

        foreach ($announcementsData as $anc) {
            Announcement::updateOrCreate(
                ['slug' => $anc['slug']],
                array_merge($anc, ['author_id' => $admin->id])
            );
        }

        // 6. Create Dynamic Pages (show_in_navbar = true)
        $pagesData = [
            [
                'title' => 'Sejarah Kurikulum',
                'slug' => 'sejarah-kurikulum',
                'show_in_navbar' => true,
                'content' => '<h2>Perjalanan Transformasi Kurikulum IT-PLN</h2><p>Sejak berdiri, IT-PLN secara konsisten melakukan pembaruan kurikulum selaras dengan perkembangan teknologi ketenagalistrikan, energi terbarukan, dan digitalisasi industri. Kurikulum 2024 menegaskan fokus utama pada Outcome-Based Education (OBE) dan penguatan kompetensi transisi energi.</p>',
            ],
            [
                'title' => 'Akreditasi Internasional',
                'slug' => 'akreditasi-internasional',
                'show_in_navbar' => true,
                'content' => '<h2>Peningkatan Standards Menuju Reputasi Global</h2><p>Bagian Pengembangan Akademik mendampingi program studi dalam mempersiapkan dokumen evaluasi diri dan ketercapaian CPL menuju akreditasi internasional seperti IABEE dan ASIIN.</p>',
            ],
            [
                'title' => 'Kemitraan Industri',
                'slug' => 'kemitraan-industri',
                'show_in_navbar' => true,
                'content' => '<h2>Sinergi Ekosistem Akademik dan Industri Energi</h2><p>Kurikulum IT-PLN disusun bersama pakar industri dari PLN Group dan mitra teknologi global untuk menjamin lulusan memiliki kesiapan kerja yang tinggi.</p>',
            ],
        ];

        foreach ($pagesData as $pg) {
            Page::updateOrCreate(
                ['slug' => $pg['slug']],
                array_merge($pg, ['author_id' => $admin->id])
            );
        }

        // 7. Create Sample Inbox Message
        InboxMessage::updateOrCreate(
            ['sender_id_number' => '202131001'],
            [
                'sender_name' => 'Ahmad Rian',
                'question_category' => 'Kurikulum & RPS',
                'message_body' => 'Mohon bantuan informasi mengenai format penyusunan silabus dan silabus mata kuliah pilihan interdisiplin.',
                'is_read' => false,
            ]
        );
    }
}
