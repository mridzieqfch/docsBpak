import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function WebContentsIndex({ contents, contentsEn }) {
    const [activeTab, setActiveTab] = useState("id");

    const { data, setData, post, processing, errors } = useForm({
        contents: {
            // Landing Page Hero
            hero_title: contents?.hero_title || "Bagian Pengembangan Akademik",
            hero_subtitle:
                contents?.hero_subtitle ||
                "Mengembangkan dan mengawal mutu kurikulum pendidikan tinggi yang adaptif, inovatif, dan berstandar internasional di Institut Teknologi PLN.",

            // Dokumen Page Hero
            doc_hero_tag: contents?.doc_hero_tag || "Pusat Repositori Resmi",
            doc_hero_title:
                contents?.doc_hero_title ||
                "Repositori Dokumen Kurikulum Akademik",
            doc_hero_subtitle:
                contents?.doc_hero_subtitle ||
                "Pusat informasi resmi untuk mahasiswa dan dosen. Akses dokumen kurikulum, MBKM, dan panduan akademik secara transparan.",

            // Pengumuman Page Hero
            news_hero_tag: contents?.news_hero_tag || "Pusat Informasi Resmi",
            news_hero_title:
                contents?.news_hero_title || "Pengumuman & Berita Terbaru",
            news_hero_subtitle:
                contents?.news_hero_subtitle ||
                "Informasi resmi seputar pemutakhiran kurikulum, pendaftaran MBKM, dan kebijakan akademik IT-PLN.",

            // Panduan Page Hero
            panduan_hero_tag: contents?.panduan_hero_tag || "Pusat Panduan Resmi",
            panduan_hero_title:
                contents?.panduan_hero_title || "Panduan & Pedoman Akademik",
            panduan_hero_subtitle:
                contents?.panduan_hero_subtitle ||
                "Petunjuk teknis dan standar operasional penyelenggaraan Kurikulum OBE, program Kampus Berdampak/MBKM, dan Rekognisi Pembelajaran Lampau (RPL) di IT-PLN.",

            // FAQ Page Hero
            faq_hero_tag: contents?.faq_hero_tag || "Pusat Bantuan & Konsultasi",
            faq_hero_title:
                contents?.faq_hero_title ||
                "Tanya Jawab (FAQ) & Layanan Informasi",
            faq_hero_subtitle:
                contents?.faq_hero_subtitle ||
                "Temukan jawaban atas pertanyaan umum atau kirimkan pertanyaan langsung ke Bagian Pengembangan Akademik IT-PLN.",

            // Visi Misi
            visi_text:
                contents?.visi_text ||
                "Menjadi pusat pengembangan akademik yang berkelas internasional, unggul dalam inovasi kurikulum, metode pembelajaran, dan pengelolaan akademik berbasis teknologi berwawasan lingkungan.",
            misi_text:
                contents?.misi_text ||
                "1. Merumuskan kebijakan standar kurikulum berstandar internasional (OBE).\n2. Mengawal implementasi Merdeka Belajar Kampus Merdeka (MBKM).\n3. Mendampingi program studi dalam evaluasi dan pemutakhiran Rencana Pembelajaran.",

            // Contact
            contact_email: contents?.contact_email || "bpak@itpln.ac.id",
            contact_address:
                contents?.contact_address ||
                "Menara PLN, Jl. Lkr. Luar Barat, Cengkareng, Jakarta Barat 11750",
            contact_location:
                contents?.contact_location || "Lantai Mezzanine Lobi Utara",
        },
        contents_en: {
            hero_title: contentsEn?.hero_title || "Academic Development Division",
            hero_subtitle:
                contentsEn?.hero_subtitle ||
                "Developing and maintaining adaptive, innovative, and internationally standardized higher education curriculum quality at PLN Institute of Technology.",

            doc_hero_tag: contentsEn?.doc_hero_tag || "Official Repository Center",
            doc_hero_title:
                contentsEn?.doc_hero_title ||
                "Academic Curriculum Document Repository",
            doc_hero_subtitle:
                contentsEn?.doc_hero_subtitle ||
                "Official information center for students and lecturers. Transparent access to curriculum documents, MBKM, and academic guidelines.",

            news_hero_tag: contentsEn?.news_hero_tag || "Official Information Center",
            news_hero_title:
                contentsEn?.news_hero_title || "Announcements & Latest News",
            news_hero_subtitle:
                contentsEn?.news_hero_subtitle ||
                "Official information regarding curriculum updates, MBKM registration, and IT-PLN academic policies.",

            panduan_hero_tag: contentsEn?.panduan_hero_tag || "Official Guideline Center",
            panduan_hero_title:
                contentsEn?.panduan_hero_title || "Academic Guidelines & Manuals",
            panduan_hero_subtitle:
                contentsEn?.panduan_hero_subtitle ||
                "Technical instructions and operational standards for implementing OBE Curriculum, Impactful Campus/MBKM programs, and Recognition of Prior Learning (RPL) at IT-PLN.",

            faq_hero_tag: contentsEn?.faq_hero_tag || "Help & Consultation Center",
            faq_hero_title:
                contentsEn?.faq_hero_title ||
                "Frequently Asked Questions (FAQ) & Information Services",
            faq_hero_subtitle:
                contentsEn?.faq_hero_subtitle ||
                "Find answers to common questions or submit inquiries directly to IT-PLN Academic Development Division.",

            visi_text:
                contentsEn?.visi_text ||
                "To become an international-class academic development center, superior in curriculum innovation, learning methods, and environmentally friendly technology-based academic management.",
            misi_text:
                contentsEn?.misi_text ||
                "1. Formulate international standard curriculum policy standards (OBE).\n2. Oversee the implementation of Merdeka Belajar Kampus Merdeka (MBKM).\n3. Assist study programs in evaluating and updating Learning Plans (RPS).",

            contact_email: contentsEn?.contact_email || "bpak@itpln.ac.id",
            contact_address:
                contentsEn?.contact_address ||
                "PLN Tower, Jl. Lkr. Luar Barat, Cengkareng, West Jakarta 11750",
            contact_location:
                contentsEn?.contact_location || "North Lobby Mezzanine Floor",
        },
    });

    const currentValues = activeTab === "id" ? data.contents : data.contents_en;

    const handleContentChange = (key, value) => {
        if (activeTab === "id") {
            setData("contents", {
                ...data.contents,
                [key]: value,
            });
        } else {
            setData("contents_en", {
                ...data.contents_en,
                [key]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.web-contents.update"));
    };

    return (
        <AdminLayout header="Kelola Konten Teks Website">
            <Head title="Kelola Konten Teks" />

            {/* TAB SELECTOR BAHASA */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-sm font-extrabold text-slate-900">Bahasa Konten</h2>
                    <p className="text-xs text-slate-500 font-medium">Pilih bahasa untuk melihat dan menyunting teks website.</p>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                    <button
                        type="button"
                        onClick={() => setActiveTab("id")}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                            activeTab === "id"
                                ? "bg-white text-slate-900 shadow-xs font-extrabold"
                                : "text-slate-600 hover:text-slate-900"
                        }`}
                    >
                        <span>🇮🇩</span> Bahasa Indonesia
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("en")}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                            activeTab === "en"
                                ? "bg-white text-slate-900 shadow-xs font-extrabold"
                                : "text-slate-600 hover:text-slate-900"
                        }`}
                    >
                        <span>🇬🇧</span> English (Inggris)
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    {/* KOLOM KIRI */}
                    <div className="space-y-6">
                        {/* 1. HERO LANDING PAGE */}
                        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs">
                            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                                <div className="w-8 h-8 rounded-xl bg-teal-50 text-brand-blue flex items-center justify-center font-bold text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-extrabold text-slate-900">
                                    Hero Header Beranda (Landing Page) {activeTab === "en" && <span className="text-xs text-blue-600 font-bold">(English)</span>}
                                </h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 tracking-wider mb-1">
                                        Judul Hero Banner (Hero Title)
                                    </label>
                                    <input
                                        type="text"
                                        value={currentValues.hero_title}
                                        onChange={(e) =>
                                            handleContentChange(
                                                "hero_title",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-bold focus:ring-2 focus:ring-brand-blue"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 tracking-wider mb-1">
                                        Subtitle / Deskripsi Hero Banner
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={currentValues.hero_subtitle}
                                        onChange={(e) =>
                                            handleContentChange(
                                                "hero_subtitle",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue font-medium"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. HERO DOKUMEN PAGE */}
                        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs">
                            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-extrabold text-slate-900">
                                    Hero Header Repositori Dokumen {activeTab === "en" && <span className="text-xs text-blue-600 font-bold">(English)</span>}
                                </h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 tracking-wider mb-1">
                                        Tag Sub-Badge Header Banner
                                    </label>
                                    <input
                                        type="text"
                                        value={currentValues.doc_hero_tag}
                                        onChange={(e) =>
                                            handleContentChange(
                                                "doc_hero_tag",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 tracking-wider mb-1">
                                        Judul Hero Banner Dokumen
                                    </label>
                                    <input
                                        type="text"
                                        value={currentValues.doc_hero_title}
                                        onChange={(e) =>
                                            handleContentChange(
                                                "doc_hero_title",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-bold focus:ring-2 focus:ring-brand-blue"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 tracking-wider mb-1">
                                        Subtitle / Deskripsi Hero Dokumen
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={currentValues.doc_hero_subtitle}
                                        onChange={(e) =>
                                            handleContentChange(
                                                "doc_hero_subtitle",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue font-medium"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 3. HERO PENGUMUMAN PAGE */}
                        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs">
                            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.684A1.761 1.761 0 013 12.016V8.984c0-.77.495-1.442 1.217-1.677l9.214-3.071a1.76 1.76 0 012.352 1.677v12.164a1.76 1.76 0 01-2.352 1.677l-4.78-1.593z" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-extrabold text-slate-900">
                                    Hero Header Pengumuman & Berita {activeTab === "en" && <span className="text-xs text-blue-600 font-bold">(English)</span>}
                                </h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 tracking-wider mb-1">
                                        Tag Sub-Badge Header Banner
                                    </label>
                                    <input
                                        type="text"
                                        value={currentValues.news_hero_tag}
                                        onChange={(e) =>
                                            handleContentChange(
                                                "news_hero_tag",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 tracking-wider mb-1">
                                        Judul Hero Banner Pengumuman
                                    </label>
                                    <input
                                        type="text"
                                        value={currentValues.news_hero_title}
                                        onChange={(e) =>
                                            handleContentChange(
                                                "news_hero_title",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-bold focus:ring-2 focus:ring-brand-blue"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 tracking-wider mb-1">
                                        Subtitle / Deskripsi Hero Pengumuman
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={currentValues.news_hero_subtitle}
                                        onChange={(e) =>
                                            handleContentChange(
                                                "news_hero_subtitle",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue font-medium"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* KOLOM KANAN */}
                    <div className="space-y-6">
                        {/* 4. HERO PANDUAN PAGE */}
                        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs">
                            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-extrabold text-slate-900">
                                    Hero Header Panduan Akademik {activeTab === "en" && <span className="text-xs text-blue-600 font-bold">(English)</span>}
                                </h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 tracking-wider mb-1">
                                        Tag Sub-Badge Header Banner
                                    </label>
                                    <input
                                        type="text"
                                        value={currentValues.panduan_hero_tag}
                                        onChange={(e) =>
                                            handleContentChange(
                                                "panduan_hero_tag",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 tracking-wider mb-1">
                                        Judul Hero Banner Panduan
                                    </label>
                                    <input
                                        type="text"
                                        value={currentValues.panduan_hero_title}
                                        onChange={(e) =>
                                            handleContentChange(
                                                "panduan_hero_title",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-bold focus:ring-2 focus:ring-brand-blue"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 tracking-wider mb-1">
                                        Subtitle / Deskripsi Hero Panduan
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={
                                            currentValues.panduan_hero_subtitle
                                        }
                                        onChange={(e) =>
                                            handleContentChange(
                                                "panduan_hero_subtitle",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue font-medium"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 5. HERO FAQ PAGE */}
                        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs">
                            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-extrabold text-slate-900">
                                    Hero Header FAQ & Bantuan {activeTab === "en" && <span className="text-xs text-blue-600 font-bold">(English)</span>}
                                </h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 tracking-wider mb-1">
                                        Tag Sub-Badge Header Banner
                                    </label>
                                    <input
                                        type="text"
                                        value={currentValues.faq_hero_tag}
                                        onChange={(e) =>
                                            handleContentChange(
                                                "faq_hero_tag",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 tracking-wider mb-1">
                                        Judul Hero Banner FAQ
                                    </label>
                                    <input
                                        type="text"
                                        value={currentValues.faq_hero_title}
                                        onChange={(e) =>
                                            handleContentChange(
                                                "faq_hero_title",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-bold focus:ring-2 focus:ring-brand-blue"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 tracking-wider mb-1">
                                        Subtitle / Deskripsi Hero FAQ
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={currentValues.faq_hero_subtitle}
                                        onChange={(e) =>
                                            handleContentChange(
                                                "faq_hero_subtitle",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue font-medium"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 6. VISI & MISI SECTION */}
                        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs">
                            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-extrabold text-slate-900">
                                    Teks Visi & Misi Divisi {activeTab === "en" && <span className="text-xs text-blue-600 font-bold">(English)</span>}
                                </h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 tracking-wider mb-1">
                                        Teks Visi {activeTab === "en" ? "(Our Vision)" : "(Visi Kami)"}
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={currentValues.visi_text}
                                        onChange={(e) =>
                                            handleContentChange(
                                                "visi_text",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue font-medium"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 tracking-wider mb-1">
                                        Teks Misi {activeTab === "en" ? "(Our Mission)" : "(Misi Kami)"} (Satu poin per baris)
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={currentValues.misi_text}
                                        onChange={(e) =>
                                            handleContentChange(
                                                "misi_text",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue font-medium"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 7. CONTACT SECTION */}
                        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs">
                            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-extrabold text-slate-900">
                                    Informasi Kontak & Footer {activeTab === "en" && <span className="text-xs text-blue-600 font-bold">(English)</span>}
                                </h3>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 tracking-wider mb-1">
                                            Email Layanan
                                        </label>
                                        <input
                                            type="email"
                                            value={currentValues.contact_email}
                                            onChange={(e) =>
                                                handleContentChange(
                                                    "contact_email",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue font-medium"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 tracking-wider mb-1">
                                            Lokasi Ruangan
                                        </label>
                                        <input
                                            type="text"
                                            value={
                                                currentValues.contact_location
                                            }
                                            onChange={(e) =>
                                                handleContentChange(
                                                    "contact_location",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue font-medium"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 tracking-wider mb-1">
                                        Alamat Lengkap Kampus
                                    </label>
                                    <input
                                        type="text"
                                        value={currentValues.contact_address}
                                        onChange={(e) =>
                                            handleContentChange(
                                                "contact_address",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue font-medium"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end sticky bottom-6 z-20 pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-8 py-3.5 bg-brand-blue hover:bg-brand-dark text-white font-extrabold text-sm rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105 disabled:opacity-50"
                    >
                        {processing
                            ? "Menyimpan Perubahan..."
                            : "Simpan Semua Perubahan Konten"}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
