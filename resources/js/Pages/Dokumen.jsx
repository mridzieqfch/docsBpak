import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import { useTranslation } from "@/context/LanguageContext";

export default function Dokumen({ categories, webContents, webContentsEn }) {
    const { lang, t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const currentWebContents = lang === 'en' ? (webContentsEn || {}) : (webContents || {});

    // Default open state for categories
    const [openCategories, setOpenCategories] = useState(
        categories?.reduce(
            (acc, cat, idx) => ({ ...acc, [cat.id]: idx === 0 }),
            {},
        ) || {},
    );

    const toggleCategory = (id) => {
        setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleCategoryFilter = (catName) => {
        setSelectedCategory(catName);
    };

    // Helpers for translation of categories
    const getCategoryTitle = (name) => {
        if (lang !== "en") return name;
        const lower = name.toLowerCase();
        if (lower.includes("kurikulum")) return "Curriculum";
        if (lower.includes("berdampak")) return "Impactful Campus";
        if (lower.includes("rpl")) return "RPL";
        return "General";
    };

    const getCategorySubtitle = (name) => {
        const title = getCategoryTitle(name);
        if (lang === "en") {
            return `Official guidelines and documents for ${title} category`;
        }
        return `Pedoman dan dokumen resmi kategori ${name}`;
    };

    // Helper for category dot color
    const getCategoryBadgeColor = (name) => {
        const lower = name.toLowerCase();
        if (lower.includes("kurikulum")) return "bg-brand-blue";
        if (lower.includes("berdampak")) return "bg-brand-yellow";
        if (lower.includes("rpl")) return "bg-purple-600";
        return "bg-emerald-500";
    };

    // Filter categories & documents
    const filteredCategories = categories
        ?.filter((category) => {
            if (selectedCategory === "all") return true;
            return category.name
                .toLowerCase()
                .includes(selectedCategory.toLowerCase());
        })
        .map((category) => {
            const filteredDocs =
                category.documents?.filter((doc) => {
                    const q = searchQuery.toLowerCase();
                    return (
                        doc.title.toLowerCase().includes(q) ||
                        doc.description?.toLowerCase().includes(q) ||
                        doc.academic_year?.toLowerCase().includes(q)
                    );
                }) || [];

            return {
                ...category,
                documents: filteredDocs,
            };
        })
        .filter((cat) => cat.documents.length > 0 || searchQuery === "");

    const totalMatchedCount =
        filteredCategories?.reduce(
            (sum, cat) => sum + (cat.documents?.length || 0),
            0,
        ) || 0;

    const docBgUrl = webContents?.doc_bg_image
        ? webContents.doc_bg_image.startsWith("http")
            ? webContents.doc_bg_image
            : `/storage/${webContents.doc_bg_image}`
        : "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1920&auto=format&fit=crop";

    return (
        <PublicLayout>
            <Head title={t("nav_documents", "Repositori Dokumen")} />

            {/* 2. HERO SECTION WITH LIBRARY BACKGROUND */}
            <section
                className="relative bg-brand-dark py-20 lg:py-28 overflow-hidden bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(8, 56, 68, 0.92), rgba(14, 90, 106, 0.88)), url('${docBgUrl}')`,
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight drop-shadow-md">
                        {currentWebContents?.doc_hero_title ||
                            t(
                                "doc_hero_title",
                                "Repositori Dokumen Kurikulum Akademik",
                            )}
                    </h1>
                    <p className="mt-4 text-base md:text-xl text-teal-100 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-xs">
                        {currentWebContents?.doc_hero_subtitle ||
                            t(
                                "doc_hero_subtitle",
                                "Pusat informasi resmi untuk mahasiswa dan dosen. Akses dokumen kurikulum, MBKM, dan panduan akademik secara transparan.",
                            )}
                    </p>
                </div>
            </section>

            {/* 3. MAIN CONTENT (SEARCH & CATEGORY FILTERS) */}
            <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                {/* Search Input & Category Filter Card */}
                <div className="relative -mt-20 z-20 mb-8 shadow-xl rounded-2xl bg-white p-4 sm:p-6 border border-gray-100 space-y-4">
                    <div className="relative flex items-center">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg
                                className="h-6 w-6 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-12 pr-10 py-3.5 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-brand-blue text-base md:text-lg text-gray-900 placeholder-gray-400 outline-none"
                            placeholder={t(
                                "doc_search_placeholder",
                                "Cari dokumen kurikulum, MBKM, atau umum...",
                            )}
                            autoComplete="off"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-gray-400 hover:text-gray-600"
                            >
                                {lang === "en" ? "Clear" : "Hapus"}
                            </button>
                        )}
                    </div>

                    {/* Category Filter Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-2">
                            {lang === "en"
                                ? "Category Filter:"
                                : "Filter Kategori:"}
                        </span>
                        <button
                            onClick={() => handleCategoryFilter("all")}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
                                selectedCategory === "all"
                                    ? "bg-brand-blue text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-brand-blue"
                            }`}
                        >
                            {t("doc_all_categories", "Semua Dokumen")}
                        </button>
                        <button
                            onClick={() => handleCategoryFilter("Kurikulum")}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
                                selectedCategory === "Kurikulum"
                                    ? "bg-brand-blue text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-brand-blue"
                            }`}
                        >
                            Kurikulum
                        </button>
                        <button
                            onClick={() =>
                                handleCategoryFilter("Kampus Berdampak")
                            }
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
                                selectedCategory === "Kampus Berdampak"
                                    ? "bg-brand-blue text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-brand-blue"
                            }`}
                        >
                            Kampus Berdampak
                        </button>
                        <button
                            onClick={() => handleCategoryFilter("RPL")}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
                                selectedCategory === "RPL"
                                    ? "bg-brand-blue text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-brand-blue"
                            }`}
                        >
                            RPL
                        </button>
                        <button
                            onClick={() => handleCategoryFilter("Umum")}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
                                selectedCategory === "Umum"
                                    ? "bg-brand-blue text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-brand-blue"
                            }`}
                        >
                            Umum
                        </button>
                    </div>
                </div>

                {/* Empty State Message */}
                {totalMatchedCount === 0 && (
                    <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100 my-8">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-300 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h3 className="text-lg font-bold text-gray-900">
                            Dokumen tidak ditemukan
                        </h3>
                        <p className="mt-1 text-gray-500 text-sm">
                            Coba gunakan kata kunci lain atau pilih kategori
                            Kurikulum, MBKM, atau Umum.
                        </p>
                    </div>
                )}

                {/* ACCORDION CONTAINER */}
                <div className="space-y-4">
                    {filteredCategories?.map((group) => {
                        const isOpen =
                            openCategories[group.id] || searchQuery.length > 0;
                        return (
                            <div
                                key={group.id}
                                className="bg-white rounded-2xl shadow-xs border border-gray-200 overflow-hidden transition-all"
                            >
                                {/* Accordion Header */}
                                <button
                                    onClick={() => toggleCategory(group.id)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-gray-50/80 transition-colors focus:outline-none"
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`w-3 h-3 rounded-full ${getCategoryBadgeColor(group.name)}`}
                                        ></span>
                                        <div>
                                            <h3 className="text-lg font-extrabold text-brand-dark">
                                                {getCategoryTitle(group.name)}
                                            </h3>
                                            <p className="text-xs text-gray-500 font-medium">
                                                {getCategorySubtitle(
                                                    group.name,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-teal-50 text-brand-blue border border-teal-100">
                                            {group.documents?.length || 0}{" "}
                                            {lang === "en"
                                                ? (group.documents?.length ||
                                                      0) === 1
                                                    ? "Document"
                                                    : "Documents"
                                                : "Dokumen"}
                                        </span>
                                        <svg
                                            className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                </button>

                                {/* Accordion Body */}
                                {isOpen && (
                                    <div className="px-6 pb-6 pt-2 space-y-3 border-t border-gray-100 bg-gray-50/40">
                                        {group.documents &&
                                        group.documents.length > 0 ? (
                                            group.documents.map((doc) => (
                                                <div
                                                    key={doc.id}
                                                    className="p-4 rounded-xl bg-white hover:bg-teal-50/40 border border-gray-200/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-colors shadow-2xs"
                                                >
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span
                                                                className={`px-2 py-0.5 text-[10px] font-extrabold rounded uppercase ${
                                                                    doc.file_type ===
                                                                    "PDF"
                                                                        ? "bg-red-100 text-red-700"
                                                                        : "bg-blue-100 text-blue-700"
                                                                }`}
                                                            >
                                                                {doc.file_type ||
                                                                    "PDF"}
                                                            </span>
                                                            <span className="text-xs text-gray-400 font-medium">
                                                                {
                                                                    doc.academic_year
                                                                }{" "}
                                                                •{" "}
                                                                {doc.uploader
                                                                    ?.name ||
                                                                    (lang ===
                                                                    "en"
                                                                        ? "Academic Development Division"
                                                                        : "Bagian Pengembangan Akademik")}
                                                            </span>
                                                        </div>
                                                        <h4 className="font-bold text-gray-900 text-base">
                                                            {lang === "en" &&
                                                            doc.title_en
                                                                ? doc.title_en
                                                                : doc.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-500 mt-0.5">
                                                            {lang === "en"
                                                                ? `Size: ${doc.file_size} • Downloaded: ${doc.download_count} times`
                                                                : `Ukuran: ${doc.file_size} • Diunduh: ${doc.download_count} kali`}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                                                        <Link
                                                            href={route(
                                                                "dokumen.detail",
                                                                doc.id,
                                                            )}
                                                            className="flex-1 sm:flex-initial px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg transition-colors text-center flex items-center justify-center gap-1"
                                                        >
                                                            <svg
                                                                className="w-4 h-4"
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
                                                            {t(
                                                                "doc_preview",
                                                                "Pratinjau",
                                                            )}
                                                        </Link>
                                                        <a
                                                            href={route(
                                                                "dokumen.download",
                                                                doc.id,
                                                            )}
                                                            className="flex-1 sm:flex-initial px-4 py-2 bg-brand-blue text-white text-xs font-bold rounded-lg hover:bg-brand-dark transition-colors shadow-xs flex items-center justify-center gap-1.5"
                                                        >
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                                />
                                                            </svg>
                                                            {t(
                                                                "doc_download",
                                                                "Unduh",
                                                            )}
                                                        </a>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-6 text-center text-gray-500 text-sm font-medium">
                                                {lang === "en"
                                                    ? "No document files available in this category."
                                                    : "Belum ada berkas dokumen pada kategori ini."}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>
        </PublicLayout>
    );
}
