import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { useTranslation } from "@/context/LanguageContext";

export default function PublicLayout({ children, title }) {
    const { flash, auth, navbarPages } = usePage().props;
    const { lang, changeLanguage, t } = useTranslation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const pagesList = navbarPages || [];

    const getPageTitle = (pg) => {
        if (lang !== "en") return pg.title;
        if (pg.title_en) return pg.title_en;
        const lower = pg.title.toLowerCase();
        if (lower.includes("akreditasi")) return "International Accreditation";
        if (lower.includes("kemitraan")) return "Industry Partnership";
        if (lower.includes("sejarah")) return "Curriculum History";
        return pg.title;
    };

    return (
        <div className="bg-gray-50 text-gray-800 antialiased min-h-screen flex flex-col font-sans">
            {/* Flash Notification Toast */}
            {flash?.success && (
                <div className="fixed bottom-5 right-5 z-50 bg-teal-800 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-teal-600 animate-bounce">
                    <svg
                        className="w-6 h-6 text-yellow-400 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    <div>
                        <p className="font-bold text-sm">Berhasil!</p>
                        <p className="text-xs text-teal-100">{flash.success}</p>
                    </div>
                </div>
            )}

            {flash?.error && (
                <div className="fixed bottom-5 right-5 z-50 bg-red-800 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-red-600">
                    <svg
                        className="w-6 h-6 text-red-300 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                    <div>
                        <p className="font-bold text-sm">Perhatian</p>
                        <p className="text-xs text-red-100">{flash.error}</p>
                    </div>
                </div>
            )}

            {/* HEADER & NAVBAR */}
            <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Left side: Logo */}
                        <Link
                            href={route("home")}
                            className="flex items-center gap-3 group"
                        >
                            <img
                                src="/assets/img/LOGO_IT_PLN.png"
                                alt="Logo IT-PLN"
                                className="h-11 w-auto object-contain transition-transform group-hover:scale-105"
                            />
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-6">
                            <nav className="flex items-center space-x-6">
                                <Link
                                    href={route("home")}
                                    className={`font-semibold transition-colors pb-1 border-b-2 ${
                                        route().current("home")
                                            ? "text-brand-blue border-brand-blue font-bold"
                                            : "text-gray-600 hover:text-brand-blue border-transparent"
                                    }`}
                                >
                                    {t("nav_home", "Beranda")}
                                </Link>

                                <Link
                                    href={route("dokumen")}
                                    className={`font-semibold transition-colors pb-1 border-b-2 ${
                                        route().current("dokumen")
                                            ? "text-brand-blue border-brand-blue font-bold"
                                            : "text-gray-600 hover:text-brand-blue border-transparent"
                                    }`}
                                >
                                    {t("nav_documents", "Dokumen")}
                                </Link>

                                {/* Dropdown Menu "Informasi" */}
                                <div className="relative group">
                                    <button className="flex items-center gap-1 text-gray-600 hover:text-brand-blue font-semibold transition-colors py-2 focus:outline-none">
                                        {t("nav_information", "Informasi")}
                                        <svg
                                            className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
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
                                    </button>
                                    <div className="absolute left-0 mt-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top-left group-hover:translate-y-1">
                                        <Link
                                            href={route("pengumuman")}
                                            className="block px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-teal-50 hover:text-brand-blue transition-colors"
                                        >
                                            {t(
                                                "nav_announcements",
                                                "Pengumuman & Berita",
                                            )}
                                        </Link>
                                        <Link
                                            href={route("panduan")}
                                            className={`block px-4 py-2.5 text-sm font-semibold transition-colors ${
                                                route().current("panduan")
                                                    ? "text-brand-blue bg-teal-50/70 font-bold"
                                                    : "text-gray-700 hover:bg-teal-50 hover:text-brand-blue"
                                            }`}
                                        >
                                            {t("nav_guide", "Panduan Akademik")}
                                        </Link>
                                        <Link
                                            href={route("faq")}
                                            className="block px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-teal-50 hover:text-brand-blue transition-colors"
                                        >
                                            {t("nav_faq", "FAQ & Layanan")}
                                        </Link>
                                    </div>
                                </div>

                                {/* Dynamic Pages Dropdown ("Lainnya") */}
                                {pagesList.length > 0 && (
                                    <div className="relative group">
                                        <button className="flex items-center gap-1 text-gray-600 hover:text-brand-blue font-semibold transition-colors py-2 focus:outline-none">
                                            {t("nav_other", "Lainnya")}
                                            <svg
                                                className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
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
                                        </button>
                                        <div className="absolute left-0 mt-0 w-60 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top-left group-hover:translate-y-1">
                                            {pagesList.map((pg) => (
                                                <Link
                                                    key={pg.id}
                                                    href={route(
                                                        "page.detail",
                                                        pg.slug,
                                                    )}
                                                    className="block px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-teal-50 hover:text-brand-blue transition-colors flex items-center justify-between"
                                                >
                                                    <span>
                                                        {getPageTitle(pg)}
                                                    </span>
                                                    <span className="text-[10px] px-1.5 py-0.5 bg-teal-100 text-teal-800 rounded font-bold">
                                                        {t(
                                                            "badge_dynamic",
                                                            "Dinamis",
                                                        )}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </nav>

                            {/* Language Switcher Selector */}
                            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs font-bold">
                                <button
                                    onClick={() => changeLanguage("id")}
                                    className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                                        lang === "id"
                                            ? "bg-white text-brand-blue shadow-xs font-extrabold"
                                            : "text-gray-500 hover:text-gray-900"
                                    }`}
                                    title="Bahasa Indonesia"
                                >
                                    <span>🇮🇩</span>
                                    <span>ID</span>
                                </button>
                                <button
                                    onClick={() => changeLanguage("en")}
                                    className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                                        lang === "en"
                                            ? "bg-white text-brand-blue shadow-xs font-extrabold"
                                            : "text-gray-500 hover:text-gray-900"
                                    }`}
                                    title="English"
                                >
                                    <span>🇬🇧</span>
                                    <span>EN</span>
                                </button>
                            </div>

                            {/* Auth Action: Shows Dashboard button only when user is logged in */}
                            {auth?.user && (
                                <div className="pl-4 border-l border-gray-200">
                                    <Link
                                        href={route("admin.dashboard")}
                                        className="inline-flex items-center px-4 py-2 bg-brand-blue text-white font-bold text-sm rounded-xl hover:bg-brand-dark transition-colors shadow-sm"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-1.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                            />
                                        </svg>
                                        {t("nav_dashboard", "Dashboard Staff")}
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Right Actions */}
                        <div className="md:hidden flex items-center gap-2">
                            {/* Mobile Language Selector */}
                            <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-xs font-bold">
                                <button
                                    onClick={() => changeLanguage("id")}
                                    className={`px-2 py-0.5 rounded ${lang === "id" ? "bg-white text-brand-blue font-extrabold" : "text-gray-500"}`}
                                >
                                    🇮🇩 ID
                                </button>
                                <button
                                    onClick={() => changeLanguage("en")}
                                    className={`px-2 py-0.5 rounded ${lang === "en" ? "bg-white text-brand-blue font-extrabold" : "text-gray-500"}`}
                                >
                                    🇬🇧 EN
                                </button>
                            </div>

                            <button
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="text-gray-600 hover:text-brand-blue focus:outline-none p-2"
                            >
                                <svg
                                    className="w-7 h-7"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {mobileMenuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown Menu Drawer */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-2 animate-fadeIn">
                        <Link
                            href={route("home")}
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50 rounded-md"
                        >
                            {t("nav_home", "Beranda")}
                        </Link>
                        <Link
                            href={route("dokumen")}
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50 rounded-md"
                        >
                            {t("nav_documents", "Dokumen")}
                        </Link>

                        <div className="pl-3 pr-2 py-2 bg-gray-50 rounded-lg space-y-1">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block">
                                {t("nav_information", "Informasi")}
                            </span>
                            <Link
                                href={route("pengumuman")}
                                className="block px-2 py-1 text-sm font-medium text-gray-700 hover:text-brand-blue"
                            >
                                {t("nav_announcements", "Pengumuman & Berita")}
                            </Link>
                            <Link
                                href={route("panduan")}
                                className="block px-2 py-1 text-sm font-medium text-gray-700 hover:text-brand-blue"
                            >
                                {t("nav_guide", "Panduan Akademik")}
                            </Link>
                            <Link
                                href={route("faq")}
                                className="block px-2 py-1 text-sm font-medium text-gray-700 hover:text-brand-blue"
                            >
                                {t("nav_faq", "FAQ & Layanan")}
                            </Link>
                        </div>

                        {pagesList.length > 0 && (
                            <div className="pl-3 pr-2 py-2 bg-gray-50 rounded-lg space-y-1">
                                <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block">
                                    {t("nav_other", "Lainnya")}
                                </span>
                                {pagesList.map((pg) => (
                                    <Link
                                        key={pg.id}
                                        href={route("page.detail", pg.slug)}
                                        className="block px-2 py-1 text-sm font-medium text-gray-700 hover:text-brand-blue"
                                    >
                                        {pg.title}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {auth?.user && (
                            <div className="pt-2">
                                <Link
                                    href={route("admin.dashboard")}
                                    className="block w-full text-center px-4 py-2.5 bg-brand-blue text-white font-bold rounded-xl"
                                >
                                    {t("nav_dashboard", "Dashboard Staff")}
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-grow">{children}</main>

            {/* FOOTER */}
            <footer className="bg-[#0e5a6a] text-white pt-14 pb-0 mt-auto relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
                        {/* Column 1: Identity */}
                        <div className="md:col-span-5 flex flex-col space-y-4">
                            <div className="flex items-center gap-3">
                                <img
                                    src="/assets/img/LOGO_IT_PLN.png"
                                    alt="Logo IT-PLN"
                                    className="h-10 w-auto bg-white p-1 rounded shadow-sm"
                                />
                                <span className="font-extrabold text-xl text-white tracking-tight leading-tight">
                                    BPAK – ITPLN
                                </span>
                            </div>
                            <p className="text-sm text-teal-100/90 leading-relaxed font-medium whitespace-pre-line">
                                {t(
                                    "footer_subtitle",
                                    "Bagian Pengembangan Akademik\nLantai Mezzanine Lobi Utara",
                                )}
                            </p>
                        </div>

                        {/* Column 2: Menu Utama */}
                        <div className="md:col-span-3 flex flex-col space-y-4">
                            <h4 className="text-white text-lg font-bold">
                                {t("footer_main_menu", "Menu Utama")}
                            </h4>
                            <div className="flex flex-col space-y-2.5 text-sm text-teal-100/90 font-medium">
                                <Link
                                    href={route("dokumen")}
                                    className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"
                                >
                                    <span className="text-yellow-400 font-bold">
                                        ›
                                    </span>{" "}
                                    {t("nav_documents", "Dokumen")}
                                </Link>
                                <Link
                                    href={route("home")}
                                    className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"
                                >
                                    <span className="text-yellow-400 font-bold">
                                        ›
                                    </span>{" "}
                                    {t("nav_home", "Beranda")}
                                </Link>
                                <Link
                                    href={route("pengumuman")}
                                    className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"
                                >
                                    <span className="text-yellow-400 font-bold">
                                        ›
                                    </span>{" "}
                                    {t(
                                        "nav_announcements",
                                        "Pengumuman & Berita",
                                    )}
                                </Link>
                                <Link
                                    href={route("panduan")}
                                    className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"
                                >
                                    <span className="text-yellow-400 font-bold">
                                        ›
                                    </span>{" "}
                                    {t("nav_guide", "Panduan Akademik")}
                                </Link>
                                <Link
                                    href={route("faq")}
                                    className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"
                                >
                                    <span className="text-yellow-400 font-bold">
                                        ›
                                    </span>{" "}
                                    {t("nav_faq", "FAQ & Layanan")}
                                </Link>
                            </div>
                        </div>

                        {/* Column 3: Kontak */}
                        <div className="md:col-span-4 flex flex-col space-y-4">
                            <h4 className="text-white text-lg font-bold">
                                {t("footer_contact", "Kontak Layanan")}
                            </h4>
                            <div className="space-y-3 text-sm text-teal-100/90 font-medium">
                                <div className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                        />
                                    </svg>
                                    <span className="leading-snug">
                                        Menara PLN, Jl. Lkr. Luar Barat,
                                        Cengkareng, Jakarta Barat 11750
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <svg
                                        className="w-5 h-5 text-yellow-400 shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <a
                                        href="mailto:bpak@itpln.ac.id"
                                        className="hover:text-yellow-300 transition-colors"
                                    >
                                        bpak@itpln.ac.id
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Bottom Bar */}
                <div className="bg-[#083844] py-4 border-t border-teal-800/60">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-teal-100/70 font-medium">
                        &copy; Copyright BPAK -{" "}
                        <a
                            href="https://itpln.ac.id"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="underline hover:text-yellow-300 transition-colors font-bold text-teal-50"
                        >
                            Institut Teknologi PLN
                        </a>{" "}
                        2026. {t("footer_rights", "Hak Cipta Dilindungi.")}
                    </div>
                </div>
            </footer>
        </div>
    );
}
