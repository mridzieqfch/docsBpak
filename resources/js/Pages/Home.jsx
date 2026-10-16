import React from "react";
import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import { useTranslation } from "@/context/LanguageContext";

export default function Home({ webContents, webContentsEn, categories, latestAnnouncements }) {
    const { lang, t } = useTranslation();

    const currentWebContents = lang === 'en' ? (webContentsEn || {}) : (webContents || {});

    const heroTitle = lang === 'en'
        ? (currentWebContents.hero_title || 'Academic Development Division')
        : (currentWebContents.hero_title || 'Bagian Pengembangan Akademik');

    const heroSubtitle = lang === 'en'
        ? (currentWebContents.hero_subtitle || 'Developing and maintaining adaptive, innovative, and internationally standardized higher education curriculum quality at PLN Institute of Technology.')
        : (currentWebContents.hero_subtitle || 'Mengembangkan dan mengawal mutu kurikulum pendidikan tinggi yang adaptif, inovatif, dan berstandar internasional di Institut Teknologi PLN.');

    const visiText = lang === 'en'
        ? (currentWebContents.visi_text || 'To become an international-class academic development center, superior in curriculum innovation, learning methods, and environmentally friendly technology-based academic management.')
        : (currentWebContents.visi_text || 'Menjadi pusat pengembangan kurikulum pendidikan tinggi yang adaptif, inovatif, dan bereputasi internasional dalam mendukung terciptanya ekosistem akademik yang bermutu tinggi pada tahun 2030.');

    const defaultMisiID = [
        "1. Merumuskan kebijakan standar kurikulum berstandar internasional (OBE).",
        "2. Mengawal implementasi Merdeka Belajar Kampus Merdeka (MBKM).",
        "3. Mendampingi program studi dalam evaluasi dan pemutakhiran Rencana Pembelajaran."
    ];

    const defaultMisiEN = [
        "1. Formulate international standard curriculum policy standards (OBE).",
        "2. Oversee the implementation of Merdeka Belajar Kampus Merdeka (MBKM).",
        "3. Assist study programs in evaluating and updating Learning Plans (RPS)."
    ];

    const rawMisi = currentWebContents.misi_text;

    const misiList = rawMisi
        ? rawMisi.split("\n").filter((line) => line.trim() !== "")
        : (lang === 'en' ? defaultMisiEN : defaultMisiID);

    const heroBgUrl = webContents?.hero_bg_image
        ? (webContents.hero_bg_image.startsWith("http") ? webContents.hero_bg_image : `/storage/${webContents.hero_bg_image}`)
        : "/assets/img/Gedung.webp";

    const structManagerImgUrl = webContents?.struct_manager_image
        ? (webContents.struct_manager_image.startsWith("http") ? webContents.struct_manager_image : `/storage/${webContents.struct_manager_image}`)
        : "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop";

    const structDeputy1ImgUrl = webContents?.struct_deputy1_image
        ? (webContents.struct_deputy1_image.startsWith("http") ? webContents.struct_deputy1_image : `/storage/${webContents.struct_deputy1_image}`)
        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop";

    const structDeputy2ImgUrl = webContents?.struct_deputy2_image
        ? (webContents.struct_deputy2_image.startsWith("http") ? webContents.struct_deputy2_image : `/storage/${webContents.struct_deputy2_image}`)
        : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop";

    return (
        <PublicLayout>
            <Head title={heroTitle} />

            {/* HERO SECTION */}
            <section
                className="relative bg-brand-dark py-24 lg:py-32 overflow-hidden bg-cover"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(8, 56, 68, 0.75), rgba(14, 90, 106, 0.7)), url('${heroBgUrl}')`,
                    backgroundPosition: "center 62%",
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-md">
                        {heroTitle}
                    </h1>
                    <p className="mt-4 text-base md:text-xl text-teal-100 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-sm">
                        {heroSubtitle}
                    </p>

                    <div className="mt-8 flex justify-center gap-4">
                        <Link
                            href={route("dokumen")}
                            className="px-8 py-3.5 bg-brand-yellow text-brand-dark font-bold rounded-xl hover:bg-yellow-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            {t('hero_cta_docs', 'Lihat Repositori Dokumen')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* VISI & MISI + STRUKTUR ORGANISASI */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Visi Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-xs border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-xl flex items-center justify-center mb-6">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-brand-dark mb-4">
                                {t('vision_title', 'Visi Kami')}
                            </h2>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                {visiText}
                            </p>
                        </div>

                        {/* Misi Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-xs border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center mb-6">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-brand-dark mb-4">
                                {t('mission_title', 'Misi Kami')}
                            </h2>
                            <ul className="text-gray-600 leading-relaxed space-y-3 list-disc pl-5 font-medium">
                                {misiList.map((item, idx) => (
                                    <li key={idx}>
                                        {item.replace(/^\d+\.\s*/, "")}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* STRUKTUR ORGANISASI (FULL CARD MODERN EXECUTIVE DESIGN) */}
                    <div className="mt-20">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
                                {t('org_title', 'Struktur Organisasi BPAK')}
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base mt-2 font-medium">
                                {t('org_subtitle', 'Bagian Pengembangan Akademik Institut Teknologi PLN.')}
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto flex flex-col items-center">
                            {/* TOP TIER: MANAGER */}
                            <div className="w-full max-w-sm mb-10">
                                <div className="group bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                                    <div className="relative w-full h-96 sm:h-[420px] overflow-hidden bg-slate-100">
                                        <img
                                            src={structManagerImgUrl}
                                            alt="Dr. Ir. Muhammad Sofyan, ST., MT"
                                            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none"></div>
                                    </div>

                                    <div className="p-6 text-center bg-white flex flex-col justify-center items-center border-t border-slate-100">
                                        <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-brand-blue transition-colors leading-tight">
                                            Dr. Ir. Muhammad Sofyan, ST., MT
                                        </h3>
                                        <p className="text-xs text-slate-500 font-semibold mt-1.5 leading-snug">
                                            {lang === 'en' ? 'Manager of Academic Development Division' : 'Manager Bagian Pengembangan Akademik'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* BOTTOM TIER: 2 DEPUTI MANAGERS */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">
                                <div className="group bg-white rounded-3xl border border-slate-200/80 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                                    <div className="relative w-full h-96 sm:h-[420px] overflow-hidden bg-slate-100">
                                        <img
                                            src={structDeputy1ImgUrl}
                                            alt="Dr. Ir. Samsurizal, ST., MT., IPM"
                                            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none"></div>
                                    </div>

                                    <div className="p-5 text-center bg-white flex flex-col justify-center items-center border-t border-slate-100">
                                        <h4 className="text-base font-extrabold text-slate-900 group-hover:text-brand-blue transition-colors leading-tight">
                                            Dr. Ir. Samsurizal, ST., MT., IPM
                                        </h4>
                                        <p className="text-xs text-slate-500 font-semibold mt-1 leading-snug">
                                            {lang === 'en' ? 'Deputy Manager of Curriculum Development' : 'Deputi Manager Pengembangan Kurikulum'}
                                        </p>
                                    </div>
                                </div>

                                <div className="group bg-white rounded-3xl border border-slate-200/80 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                                    <div className="relative w-full h-96 sm:h-[420px] overflow-hidden bg-slate-100">
                                        <img
                                            src={structDeputy2ImgUrl}
                                            alt="Dody, S.Kom., M.Kom"
                                            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none"></div>
                                    </div>

                                    <div className="p-5 text-center bg-white flex flex-col justify-center items-center border-t border-slate-100">
                                        <h4 className="text-base font-extrabold text-slate-900 group-hover:text-brand-blue transition-colors leading-tight">
                                            Dody, S.Kom., M.Kom
                                        </h4>
                                        <p className="text-xs text-slate-500 font-semibold mt-1 leading-snug">
                                            {lang === 'en' ? 'Deputy Manager of Learning Systems' : 'Deputi Manager Sistem Pembelajaran'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CALLOUT BANNER TO REPOSITORY */}
            <section className="py-16 bg-teal-50/50 border-y border-teal-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-brand-dark mb-4">
                        {lang === 'en' ? 'Access Curriculum Documents & Academic Guides' : 'Akses Dokumen Kurikulum & Panduan Akademik'}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-base font-medium">
                        {lang === 'en'
                            ? 'Download curriculum files, MBKM technical guidelines, general documents, and complete academic guidelines directly.'
                            : 'Unduh berkas kurikulum, petunjuk teknis MBKM, dokumen umum, serta pedoman akademik lengkap secara langsung.'}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href={route("dokumen")}
                            className="inline-flex items-center px-8 py-3.5 bg-brand-blue text-white font-bold rounded-xl hover:bg-brand-dark transition-all shadow-md hover:shadow-lg"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            {lang === 'en' ? 'Open Document Repository' : 'Buka Repositori Dokumen'}
                        </Link>
                        <Link
                            href={route("faq")}
                            className="inline-flex items-center px-8 py-3.5 bg-white text-brand-blue border-2 border-brand-blue font-bold rounded-xl hover:bg-teal-50 transition-all shadow-xs"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            {lang === 'en' ? 'FAQ & Inquiry' : 'FAQ & Tanya Jawab'}
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
