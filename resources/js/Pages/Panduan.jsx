import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import { useTranslation } from "@/context/LanguageContext";

export default function Panduan({ guideDocuments, webContents, webContentsEn }) {
    const { lang, t } = useTranslation();
    const currentWebContents = lang === 'en' ? (webContentsEn || {}) : (webContents || {});
    const [activeTab, setActiveTab] = useState("obe");
    const [carouselIndex, setCarouselIndex] = useState(0);

    const isCarousel = guideDocuments && guideDocuments.length > 3;
    const maxIndex = isCarousel ? guideDocuments.length - 3 : 0;

    const nextSlide = () => {
        setCarouselIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    };

    const prevSlide = () => {
        setCarouselIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    };

    const panduanBgUrl = webContents?.panduan_bg_image
        ? webContents.panduan_bg_image.startsWith("http")
            ? webContents.panduan_bg_image
            : `/storage/${webContents.panduan_bg_image}`
        : "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1920&auto=format&fit=crop";

    return (
        <PublicLayout>
            <Head title={t("guide_hero_title", "Panduan & Pedoman Akademik")} />

            {/* 2. HERO SECTION */}
            <section
                className="relative bg-brand-dark py-20 lg:py-28 overflow-hidden bg-cover"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(8, 56, 68, 0.88), rgba(14, 90, 106, 0.82)), url('${panduanBgUrl}')`,
                    backgroundPosition: "center 25%",
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight drop-shadow-md">
                        {currentWebContents?.panduan_hero_title ||
                            t("guide_hero_title", "Panduan & Pedoman Akademik")}
                    </h1>
                    <p className="mt-4 text-base md:text-xl text-teal-100 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-xs">
                        {currentWebContents?.panduan_hero_subtitle ||
                            t(
                                "guide_hero_subtitle",
                                "Petunjuk teknis dan standar operasional penyelenggaraan Kurikulum OBE, program Kampus Berdampak/MBKM, dan Rekognisi Pembelajaran Lampau (RPL) di IT-PLN.",
                            )}
                    </p>
                </div>
            </section>

            {/* 3. PANDUAN INTERACTIVE TABS & CONTENT */}
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="bg-white rounded-2xl shadow-xs border border-gray-200 overflow-hidden mb-12">
                    {/* Tab Headers */}
                    <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50 px-4 pt-3 gap-2">
                        <button
                            onClick={() => setActiveTab("obe")}
                            className={`px-6 py-4 font-bold whitespace-nowrap focus:outline-none transition-colors border-b-4 ${
                                activeTab === "obe"
                                    ? "text-brand-blue border-brand-blue bg-white rounded-t-xl"
                                    : "text-gray-500 hover:text-brand-blue border-transparent"
                            }`}
                        >
                            {t("tab_obe", "Standar Kurikulum OBE")}
                        </button>
                        <button
                            onClick={() => setActiveTab("sks")}
                            className={`px-6 py-4 font-bold whitespace-nowrap focus:outline-none transition-colors border-b-4 ${
                                activeTab === "sks"
                                    ? "text-brand-blue border-brand-blue bg-white rounded-t-xl"
                                    : "text-gray-500 hover:text-brand-blue border-transparent"
                            }`}
                        >
                            {t("tab_sks", "Aturan & Beban SKS")}
                        </button>
                        <button
                            onClick={() => setActiveTab("mbkm")}
                            className={`px-6 py-4 font-bold whitespace-nowrap focus:outline-none transition-colors border-b-4 ${
                                activeTab === "mbkm"
                                    ? "text-brand-blue border-brand-blue bg-white rounded-t-xl"
                                    : "text-gray-500 hover:text-brand-blue border-transparent"
                            }`}
                        >
                            {t("tab_mbkm", "Panduan Kampus Berdampak (MBKM)")}
                        </button>
                        <button
                            onClick={() => setActiveTab("rpl")}
                            className={`px-6 py-4 font-bold whitespace-nowrap focus:outline-none transition-colors border-b-4 ${
                                activeTab === "rpl"
                                    ? "text-brand-blue border-brand-blue bg-white rounded-t-xl"
                                    : "text-gray-500 hover:text-brand-blue border-transparent"
                            }`}
                        >
                            {t("tab_rpl", "Pedoman RPL")}
                        </button>
                    </div>

                    {/* Tab Contents */}
                    <div className="p-6 md:p-10">
                        {/* Content 1: OBE */}
                        {activeTab === "obe" && (
                            <div className="animate-fadeIn">
                                <div className="flex flex-col lg:flex-row gap-8 items-center">
                                    <div className="flex-1">
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full mb-3 inline-block">
                                            {lang === "en"
                                                ? "Outcome-Based Curriculum System"
                                                : "Sistem Kurikulum Berbasis Luaran"}
                                        </span>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            {t(
                                                "guide_obe_title",
                                                "Outcome-Based Education (OBE)",
                                            )}
                                        </h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            {t(
                                                "guide_obe_desc",
                                                "Sistem pendidikan di IT-PLN berfokus pada pencapaian luaran (outcome) yang terukur. Mahasiswa diukur berdasarkan kompetensi praktis yang siap diterapkan pada industri ketenagalistrikan dan energi terbarukan.",
                                            )}
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-100">
                                                <h4 className="font-bold text-brand-blue text-sm mb-1">
                                                    {t(
                                                        "guide_cpl_title",
                                                        "CPL (Capaian Pembelajaran)",
                                                    )}
                                                </h4>
                                                <p className="text-xs text-gray-600">
                                                    {t(
                                                        "guide_cpl_desc",
                                                        "Terdiri dari aspek Sikap, Pengetahuan, Keterampilan Umum & Khusus.",
                                                    )}
                                                </p>
                                            </div>
                                            <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-100">
                                                <h4 className="font-bold text-brand-blue text-sm mb-1">
                                                    {t(
                                                        "guide_asses_title",
                                                        "Asesmen Terstandar",
                                                    )}
                                                </h4>
                                                <p className="text-xs text-gray-600">
                                                    {t(
                                                        "guide_asses_desc",
                                                        "Evaluasi berbasis rubrik objektif pada setiap Rencana Pembelajaran Semester.",
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 w-full bg-brand-light rounded-xl p-8 flex items-center justify-center border border-teal-100">
                                        <div className="text-center">
                                            <div className="w-20 h-20 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                                <svg
                                                    className="w-10 h-10"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <h4 className="font-bold text-gray-800 text-lg">
                                                Continuous Quality Improvement
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {t(
                                                    "guide_cqi_desc",
                                                    "Evaluasi bertahap untuk penjaminan mutu lulusan",
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Content 2: SKS */}
                        {activeTab === "sks" && (
                            <div className="animate-fadeIn">
                                <div className="flex flex-col lg:flex-row gap-8 items-center">
                                    <div className="flex-1">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full mb-3 inline-block">
                                            Beban Belajar Mahasiswa
                                        </span>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            Sistem Kredit Semester (SKS)
                                        </h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            Satu SKS kuliah setara dengan 170
                                            menit kegiatan belajar per minggu
                                            dalam satu semester. Penyelenggaraan
                                            dibagi menjadi 3 komponen utama:
                                        </p>
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                                <p className="text-2xl font-extrabold text-brand-blue mb-1">
                                                    50 Min
                                                </p>
                                                <p className="text-xs font-bold text-gray-500">
                                                    Tatap Muka
                                                </p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                                <p className="text-2xl font-extrabold text-brand-blue mb-1">
                                                    60 Min
                                                </p>
                                                <p className="text-xs font-bold text-gray-500">
                                                    Terstruktur
                                                </p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                                <p className="text-2xl font-extrabold text-brand-blue mb-1">
                                                    60 Min
                                                </p>
                                                <p className="text-xs font-bold text-gray-500">
                                                    Belajar Mandiri
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Content 3: MBKM */}
                        {activeTab === "mbkm" && (
                            <div className="animate-fadeIn">
                                <div className="flex flex-col lg:flex-row gap-8 items-center">
                                    <div className="flex-1">
                                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full mb-3 inline-block">
                                            Program Pembelajaran Luar Kampus
                                        </span>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            Konversi & Ekuivalensi WRAP MBKM
                                        </h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            Mahasiswa IT-PLN berhak mengambil
                                            hingga 20 SKS di luar program studi
                                            melalui Magang Bersertifikat, Studi
                                            Independen, Pertukaran Mahasiswa,
                                            maupun Proyek Kemanusiaan.
                                        </p>
                                        <Link
                                            href={route("dokumen")}
                                            className="inline-flex items-center px-5 py-2.5 bg-brand-blue text-white font-bold rounded-lg hover:bg-brand-dark transition-colors text-sm"
                                        >
                                            Lihat Dokumen Konversi MBKM
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Content 4: RPL */}
                        {activeTab === "rpl" && (
                            <div className="animate-fadeIn">
                                <div className="flex flex-col lg:flex-row gap-8 items-center">
                                    <div className="flex-1">
                                        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-3 inline-block">
                                            Pengakuan Capaian Pembelajaran
                                        </span>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            Rekognisi Pembelajaran Lampau (RPL)
                                        </h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            Pengakuan atas capaian pembelajaran
                                            seseorang yang diperoleh dari
                                            pendidikan nonformal, informal, atau
                                            pengalaman kerja ke dalam pendidikan
                                            formal perguruan tinggi.
                                        </p>
                                        <Link
                                            href={route("dokumen")}
                                            className="inline-flex items-center px-5 py-2.5 bg-brand-yellow text-teal-950 font-bold rounded-lg hover:bg-yellow-400 transition-colors text-sm"
                                        >
                                            Lihat Pedoman RPL
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Download Center Section */}
                <section className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-6 h-6 text-brand-blue shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <h3 className="text-xl font-bold text-gray-900">
                                {t(
                                    "guide_download_title",
                                    "Unduhan Berkas Panduan Resmi",
                                )}
                            </h3>
                        </div>

                        {/* Carousel Arrows (Rendered if > 3 documents) */}
                        {isCarousel && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={prevSlide}
                                    className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-teal-50 hover:text-brand-blue text-gray-600 transition-colors focus:outline-none shadow-xs"
                                    aria-label="Previous Slide"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>
                                <span className="text-xs font-bold text-gray-500 px-1">
                                    {carouselIndex + 1} / {maxIndex + 1}
                                </span>
                                <button
                                    onClick={nextSlide}
                                    className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-teal-50 hover:text-brand-blue text-gray-600 transition-colors focus:outline-none shadow-xs"
                                    aria-label="Next Slide"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Carousel Container or Standard Grid */}
                    {guideDocuments && guideDocuments.length > 0 ? (
                        isCarousel ? (
                            <div className="relative overflow-hidden">
                                <div
                                    className="flex transition-transform duration-500 ease-out gap-6"
                                    style={{
                                        transform: `translateX(-${carouselIndex * (100 / 3 + 2)}%)`,
                                    }}
                                >
                                    {guideDocuments.map((doc) => (
                                        <div
                                            key={doc.id}
                                            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-brand-blue transition-all flex flex-col justify-between"
                                        >
                                            <div>
                                                <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mb-1">
                                                    {doc.file_type ||
                                                        "PDF Document"}
                                                </span>
                                                <h4 className="font-bold text-gray-800 text-base mb-2 line-clamp-2">
                                                    {doc.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 mb-4">
                                                    {lang === "en"
                                                        ? `Academic Year: ${doc.academic_year} • Size: ${doc.file_size}`
                                                        : `Tahun Akademik: ${doc.academic_year} • Ukuran: ${doc.file_size}`}
                                                </p>
                                            </div>
                                            <Link
                                                href={route(
                                                    "dokumen.detail",
                                                    doc.id,
                                                )}
                                                className="w-full py-2 bg-brand-blue text-white font-bold rounded-lg hover:bg-brand-dark text-xs text-center transition-colors block shadow-xs"
                                            >
                                                {t(
                                                    "guide_preview_download",
                                                    "Pratinjau & Unduh",
                                                )}
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                                {/* Carousel Dots Pagination */}
                                <div className="flex justify-center items-center gap-1.5 mt-6">
                                    {Array.from({ length: maxIndex + 1 }).map(
                                        (_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() =>
                                                    setCarouselIndex(idx)
                                                }
                                                className={`h-2 rounded-full transition-all ${
                                                    carouselIndex === idx
                                                        ? "w-6 bg-brand-blue"
                                                        : "w-2 bg-gray-300 hover:bg-gray-400"
                                                }`}
                                                aria-label={`Go to slide ${idx + 1}`}
                                            />
                                        ),
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {guideDocuments.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-brand-blue transition-all flex flex-col justify-between"
                                    >
                                        <div>
                                            <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mb-1">
                                                {doc.file_type ||
                                                    "PDF Document"}
                                            </span>
                                            <h4 className="font-bold text-gray-800 text-base mb-2 line-clamp-2">
                                                {doc.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 mb-4">
                                                {lang === "en"
                                                    ? `Academic Year: ${doc.academic_year} • Size: ${doc.file_size}`
                                                    : `Tahun Akademik: ${doc.academic_year} • Ukuran: ${doc.file_size}`}
                                            </p>
                                        </div>
                                        <Link
                                            href={route(
                                                "dokumen.detail",
                                                doc.id,
                                            )}
                                            className="w-full py-2 bg-brand-blue text-white font-bold rounded-lg hover:bg-brand-dark text-xs text-center transition-colors block shadow-xs"
                                        >
                                            {t(
                                                "guide_preview_download",
                                                "Pratinjau & Unduh",
                                            )}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )
                    ) : (
                        <div className="text-center py-8 text-gray-500 text-sm">
                            {lang === "en"
                                ? "Please visit the Document Repository page for complete guide files."
                                : "Silakan akses halaman Repositori Dokumen untuk daftar berkas panduan lengkap."}
                        </div>
                    )}
                </section>
            </main>
        </PublicLayout>
    );
}
