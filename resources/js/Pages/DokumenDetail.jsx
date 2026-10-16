import React from "react";
import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import { useTranslation } from "@/context/LanguageContext";

export default function DokumenDetail({ document, relatedDocuments }) {
    const { lang, t } = useTranslation();
    const fileUrl = `/storage/${document.file_path}`;
    const fileName = document.file_path
        ? document.file_path.split("/").pop()
        : `${document.title}.pdf`;

    return (
        <PublicLayout>
            <Head title={`${document.title}`} />

            {/* 2. BREADCRUMB & HEADER SECTION */}
            <section className="bg-brand-blue text-white py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center text-xs sm:text-sm text-teal-100/90 mb-4 font-medium">
                        <Link
                            href={route("home")}
                            className="hover:text-yellow-300 transition-colors"
                        >
                            {t('nav_home', 'Beranda')}
                        </Link>
                        <span className="mx-2">/</span>
                        <Link
                            href={route("dokumen")}
                            className="hover:text-yellow-300 transition-colors"
                        >
                            {t('nav_documents', 'Repositori Dokumen')}
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-white font-semibold line-clamp-1">
                            {lang === 'en' && document.title_en ? document.title_en : document.title}
                        </span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <span className="inline-block px-3 py-1 bg-yellow-400 text-teal-950 text-xs font-extrabold rounded-full mb-2 uppercase tracking-wide">
                                {lang === 'en' && document.category?.name_en ? document.category.name_en : (document.category?.name || "Dokumen Kurikulum")}
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                                {lang === 'en' && document.title_en ? document.title_en : document.title}
                            </h1>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <Link
                                href={route("dokumen")}
                                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg text-sm font-bold transition-all flex items-center gap-2"
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
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                {t('detail_back_repository', 'Kembali')}
                            </Link>
                            <a
                                href={route("dokumen.download", document.id)}
                                className="px-5 py-2.5 bg-brand-yellow hover:bg-yellow-400 text-brand-dark rounded-lg text-sm font-bold transition-all shadow-lg flex items-center gap-2"
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
                                {t('doc_download', 'Unduh File')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. MAIN CONTENT: PDF VIEWER & SIDEBAR */}
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* LEFT COLUMN: PDF EMBED VIEWER (8 cols) */}
                    <div className="lg:col-span-8 flex flex-col space-y-4">
                        {/* Viewer Toolbar Header */}
                        <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                                    <svg
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2-7h2v-2h-2v2zm2-11c-3.86 0-7 3.14-7 7h2c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.28-1.54 4.02-3.41 5.38-.85.62-1.59 1.5-1.59 2.62v1h-2v-1c0-1.72 1.54-3.02 3.41-4.38.85-.62 1.59-1.5 1.59-2.62 0-2.76-2.24-5-5-5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-1">
                                        {fileName}
                                    </h2>
                                    <p className="text-xs text-gray-500 font-medium">
                                        {lang === 'en' ? 'Official encrypted document BPAK IT-PLN' : 'Dokumen Resmi terenkripsi BPAK IT-PLN'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <a
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                                    title={t('detail_new_tab', 'Buka di Tab Baru')}
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
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                    <span className="hidden sm:inline">
                                        {t('detail_new_tab', 'Tab Baru')}
                                    </span>
                                </a>
                                <button
                                    onClick={() => window.print()}
                                    className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                                    title={t('detail_print', 'Cetak Dokumen')}
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
                                            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                                        />
                                    </svg>
                                    <span className="hidden sm:inline">
                                        {t('detail_print', 'Cetak')}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Embedded PDF Frame */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-2 relative overflow-hidden">
                            <iframe
                                src={`${fileUrl}#toolbar=1`}
                                className="w-full h-[750px] rounded-lg border-0 bg-gray-100"
                                title="PDF Viewer"
                            ></iframe>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: METADATA CARD & RELATED DOCUMENTS (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col space-y-6">
                        {/* Document Metadata Card */}
                        <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6 space-y-4">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                <h3 className="font-extrabold text-gray-900 text-base">
                                    {t('detail_info_card', 'Detail Informasi Dokumen')}
                                </h3>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    {t('detail_verified', 'Terverifikasi Resmi')}
                                </span>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">
                                        {t('detail_academic_year', 'Tahun Akademik')}
                                    </span>
                                    <span className="font-bold text-gray-800">
                                        {document.academic_year || "-"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">
                                        {t('detail_uploader', 'Pengunggah Berkas')}
                                    </span>
                                    <span className="font-bold text-gray-800">
                                        {document.uploader?.name || "Administrator BPAK"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">
                                        {t('detail_file_size', 'Ukuran Berkas')}
                                    </span>
                                    <span className="font-bold text-gray-800">
                                        {document.file_size || "-"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">
                                        {t('detail_download_count', 'Jumlah Unduhan')}
                                    </span>
                                    <span className="font-bold text-brand-blue">
                                        {document.download_count || 0}x diunduh
                                    </span>
                                </div>

                                {document.description && (
                                    <div className="pt-2 border-t border-gray-100">
                                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">
                                            {lang === 'en' ? 'Description' : 'Deskripsi Dokumen'}
                                        </span>
                                        <p className="text-xs text-gray-600 leading-relaxed font-medium">
                                            {document.description}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="pt-3 border-t border-gray-100">
                                <a
                                    href={route("dokumen.download", document.id)}
                                    className="w-full py-3 bg-brand-blue hover:bg-brand-dark text-white font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
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
                                    {t('detail_download_file', 'Unduh Berkas Resmi (PDF)')}
                                </a>
                            </div>
                        </div>

                        {/* Related Documents Sidebar */}
                        {relatedDocuments && relatedDocuments.length > 0 && (
                            <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6 space-y-4">
                                <h3 className="font-bold text-gray-900 text-base border-b border-gray-100 pb-3">
                                    {t('detail_related_docs', 'Dokumen Terkait')}
                                </h3>

                                <div className="space-y-3">
                                    {relatedDocuments.map((doc) => (
                                        <Link
                                            key={doc.id}
                                            href={route("dokumen.detail", doc.id)}
                                            className="block p-3 rounded-lg bg-gray-50 hover:bg-teal-50/60 border border-gray-100 transition-all group"
                                        >
                                            <h4 className="font-bold text-xs text-gray-800 group-hover:text-brand-blue line-clamp-2">
                                                {doc.title}
                                            </h4>
                                            <p className="text-[11px] text-gray-400 font-medium mt-1">
                                                {doc.academic_year} • {doc.file_size}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
}
