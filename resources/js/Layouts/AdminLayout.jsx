import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function AdminLayout({ children, title, header }) {
    const { auth, flash } = usePage().props;
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Get user initials for avatar
    const getUserInitials = (name) => {
        if (!name) return "AD";
        const parts = name.trim().split(" ");
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const navGroups = [
        {
            title: "Utama",
            items: [
                {
                    name: "Dashboard Admin",
                    route: "admin.dashboard",
                    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                },
            ],
        },
        {
            title: "Repositori & Dokumen",
            items: [
                {
                    name: "Kategori Dokumen",
                    route: "admin.categories.index",
                    icon: "M7 7h10M7 12h10M7 17h10M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z",
                },
                {
                    name: "Repositori Dokumen",
                    route: "admin.documents.index",
                    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                },
            ],
        },
        {
            title: "Konten & Publikasi",
            items: [
                {
                    name: "Pengumuman & Berita",
                    route: "admin.announcements.index",
                    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
                },
                {
                    name: "Konten Teks Utama",
                    route: "admin.web-contents.index",
                    icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
                },
                {
                    name: "Kelola Gambar",
                    route: "admin.hero-images.index",
                    icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
                },
                {
                    name: "Halaman Dinamis CMS",
                    route: "admin.pages.index",
                    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                },
            ],
        },
        {
            title: "Layanan & Interaksi",
            items: [
                {
                    name: "FAQ & Layanan",
                    route: "admin.faqs.index",
                    icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                },
                {
                    name: "Inbox Pesan Masuk",
                    route: "admin.inbox.index",
                    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                },
            ],
        },
    ];

    const renderNavGroup = (group) => (
        <div key={group.title} className="mb-4">
            <h3 className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-amber-300/90 mb-1.5">
                {group.title}
            </h3>
            <div className="space-y-1">
                {group.items.map((item) => {
                    const isActive = route().current(item.route);
                    return (
                        <Link
                            key={item.route}
                            href={route(item.route)}
                            onClick={() => setSidebarOpen(false)}
                            className={`group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 ${
                                isActive
                                    ? "bg-gradient-to-r from-brand-blue to-teal-600 text-white shadow-md shadow-teal-950/40 ring-1 ring-teal-400/30"
                                    : "text-slate-300 hover:text-white hover:bg-teal-900/40 hover:translate-x-1"
                            }`}
                        >
                            {isActive && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-brand-yellow rounded-r-full shadow-sm"></span>
                            )}
                            <div
                                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                                    isActive
                                        ? "bg-white/20 text-white"
                                        : "bg-teal-950/60 text-teal-300/80 group-hover:bg-brand-blue/40 group-hover:text-white"
                                }`}
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
                                        d={item.icon}
                                    />
                                </svg>
                            </div>
                            <span className="truncate">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 bg-gradient-to-b from-[#072830] via-[#093542] to-[#04171d] text-white fixed inset-y-0 z-30 shadow-2xl border-r border-teal-900/40">
                {/* Brand Logo Header */}
                <div className="h-20 bg-[#ffff] backdrop-blur-md flex items-center px-5 justify-between border-b border-teal-900/60">
                    <div className="flex items-center gap-3">
                        <div className=" p-1 rounded-md shadow-md ring-1 ring-white/20">
                            <img
                                src="/assets/img/LOGO_IT_PLN.png"
                                alt="Logo IT-PLN"
                                className="h-8 w-auto object-contain"
                            />
                        </div>
                        <div>
                            <h1 className="font-extrabold text-sm text-gray-700 tracking-wide leading-none mb-1 flex items-center gap-1.5">
                                BPAK
                            </h1>
                            <span className="text-[10px] text-teal-800/90 font-bold tracking-wider block">
                                Dashboard Admin
                            </span>
                        </div>
                    </div>
                </div>

                {/* Sidebar Navigation */}
                <div className="flex-1 overflow-y-auto py-5 px-3 custom-scrollbar">
                    {navGroups.map(renderNavGroup)}
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden flex">
                    <div
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                    <aside className="relative flex flex-col w-64 bg-gradient-to-b from-[#072830] via-[#093542] to-[#04171d] text-white z-50 shadow-2xl border-r border-teal-900/60">
                        <div className="h-20 bg-[#051e24] flex items-center px-5 justify-between border-b border-teal-900/60">
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-1 rounded-xl shadow-sm">
                                    <img
                                        src="/assets/img/LOGO_IT_PLN.png"
                                        alt="Logo IT-PLN"
                                        className="h-8 w-auto"
                                    />
                                </div>
                                <span className="font-extrabold text-sm text-white">
                                    BPAK CMS
                                </span>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="text-teal-300 hover:text-white p-1"
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
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto py-5 px-3">
                            {navGroups.map(renderNavGroup)}
                        </div>
                    </aside>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
                {/* Header Navbar */}
                <header className="h-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-xs">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2.5 text-slate-600 hover:text-brand-blue hover:bg-slate-100 rounded-xl transition-colors"
                        >
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
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                        <div>
                            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                                {header || "Admin Dashboard"}
                            </h2>
                            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                                Bagian Pengembangan Akademik & Kurikulum IT-PLN
                            </p>
                        </div>
                    </div>

                    {/* Right User Bar */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                            {/* User Avatar Circle */}
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue to-teal-500 text-white font-extrabold text-xs flex items-center justify-center shadow-xs ring-2 ring-teal-100">
                                {getUserInitials(user?.name)}
                            </div>

                            <div className="hidden sm:flex flex-col">
                                <span className="text-xs font-extrabold text-slate-900 leading-snug">
                                    {user?.name || "Administrator"}
                                </span>
                                <div className="flex items-center gap-1">
                                    <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-0.5 py-0.5 rounded-full uppercase tracking-wider border border-amber-200/80">
                                        {user?.role || "SUPERADMIN"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={route("home")}
                            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 bg-teal-50 hover:bg-teal-100 text-brand-blue rounded-xl text-xs font-bold transition-all border border-teal-100"
                            target="_blank"
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
                            Website Publik
                        </Link>

                        <Link
                            method="post"
                            href={route("logout")}
                            as="button"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-xl text-xs font-bold transition-all border border-slate-200/80 hover:border-red-200"
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
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            <span className="hidden sm:inline">Keluar</span>
                        </Link>
                    </div>
                </header>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="mx-4 sm:mx-6 lg:mx-8 mt-6 bg-emerald-50 border border-emerald-200 text-emerald-950 px-5 py-3.5 rounded-2xl shadow-xs flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <span className="text-xs sm:text-sm font-bold">
                                {flash.success}
                            </span>
                        </div>
                    </div>
                )}

                {flash?.error && (
                    <div className="mx-4 sm:mx-6 lg:mx-8 mt-6 bg-rose-50 border border-rose-200 text-rose-950 px-5 py-3.5 rounded-2xl shadow-xs flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
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
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>
                            <span className="text-xs sm:text-sm font-bold">
                                {flash.error}
                            </span>
                        </div>
                    </div>
                )}

                {/* Main Content Body */}
                <main className="p-4 sm:p-6 lg:p-8 flex-1">{children}</main>
            </div>
        </div>
    );
}
