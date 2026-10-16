import React, { useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard({
    stats,
    recentInboxMessages,
    recentDocuments,
}) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedDate = currentTime.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const formattedTime = currentTime.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    const todayDateTimeFormatted = `${formattedDate} • ${formattedTime} WIB`;

    return (
        <AdminLayout header="Dashboard Overview Staff BPAK">
            <Head title="Dashboard" />

            {/* WELCOME BANNER CARD */}
            <div className="relative bg-gradient-to-r from-[#072a33] via-[#0b4250] to-brand-blue text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 overflow-hidden border border-teal-800/40">
                <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-teal-400/10 blur-3xl pointer-events-none"></div>
                <div className="absolute right-20 -top-10 w-48 h-48 rounded-full bg-brand-yellow/10 blur-2xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-teal-200 mb-3 border border-white/10">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            {todayDateTimeFormatted}
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                            Selamat Datang Kembali,{" "}
                            {user?.name || "Administrator"}!
                        </h1>
                        <p className="mt-2 text-xs sm:text-sm text-teal-100/90 max-w-2xl font-medium leading-relaxed">
                            Kelola repositori dokumen kurikulum, pengumuman
                            resmi, pesan masuk pengunjung, dan konten dinamis
                            website BPAK IT-PLN dari satu panel kendali.
                        </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-3">
                        <Link
                            href={route("admin.documents.index")}
                            className="px-4 py-2.5 bg-brand-yellow hover:bg-yellow-400 text-brand-dark font-extrabold text-xs rounded-xl shadow-md transition-all hover:scale-105"
                        >
                            + Unggah Dokumen
                        </Link>
                        <Link
                            href={route("admin.announcements.index")}
                            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs rounded-xl transition-all border border-white/20"
                        >
                            + Buat Pengumuman
                        </Link>
                    </div>
                </div>
            </div>

            {/* QUICK STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
                {/* Stat 1: Total Dokumen */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:-translate-y-1.5 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 group">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                            Total Dokumen
                        </span>
                        <div className="w-11 h-11 bg-gradient-to-br from-teal-500 to-brand-blue text-white rounded-2xl flex items-center justify-center font-bold shadow-md shadow-teal-500/20 group-hover:scale-110 transition-transform">
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
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                    </div>
                    <p className="text-3xl font-black text-slate-900 mb-1">
                        {stats?.document_count || 0}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                        Berkas di repositori
                    </div>
                </div>

                {/* Stat 2: Pesan Belum Dibaca */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:-translate-y-1.5 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 group">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                            Pesan Unread
                        </span>
                        <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-amber-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-md shadow-amber-500/20 group-hover:scale-110 transition-transform">
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
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                    </div>
                    <p className="text-3xl font-black text-amber-600 mb-1">
                        {stats?.unread_inbox_count || 0}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        Pesan belum dibaca
                    </div>
                </div>

                {/* Stat 3: Pengumuman */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:-translate-y-1.5 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 group">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                            Pengumuman
                        </span>
                        <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
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
                                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                />
                            </svg>
                        </div>
                    </div>
                    <p className="text-3xl font-black text-slate-900 mb-1">
                        {stats?.announcement_count || 0}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        Berita & Warta
                    </div>
                </div>

                {/* Stat 4: Kategori Dokumen */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:-translate-y-1.5 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 group">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                            Kategori Dokumen
                        </span>
                        <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
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
                                    d="M7 7h10M7 12h10M7 17h10M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                                />
                            </svg>
                        </div>
                    </div>
                    <p className="text-3xl font-black text-slate-900 mb-1">
                        {stats?.category_count || 0}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Katalog Kurikulum
                    </div>
                </div>

                {/* Stat 5: Halaman Dinamis */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:-translate-y-1.5 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 group">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                            Halaman CMS
                        </span>
                        <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-md shadow-purple-500/20 group-hover:scale-110 transition-transform">
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
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>
                    </div>
                    <p className="text-3xl font-black text-slate-900 mb-1">
                        {stats?.page_count || 0}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                        Dynamic Pages
                    </div>
                </div>
            </div>

            {/* RECENT DATA PANELS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Inbox Messages Card */}
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
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
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-base font-extrabold text-slate-900">
                                    Pesan Masuk Terbaru
                                </h3>
                                <p className="text-xs text-slate-400 font-medium">
                                    Konsultasi & pertanyaan pengunjung website
                                </p>
                            </div>
                        </div>
                        <Link
                            href={route("admin.inbox.index")}
                            className="text-xs font-extrabold text-brand-blue hover:text-brand-dark flex items-center gap-1 group"
                        >
                            Lihat Semua
                            <svg
                                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
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
                        </Link>
                    </div>

                    <div className="space-y-3.5">
                        {recentInboxMessages &&
                        recentInboxMessages.length > 0 ? (
                            recentInboxMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`p-4 rounded-2xl border transition-all ${
                                        !msg.is_read
                                            ? "bg-amber-50/50 border-amber-200/80 shadow-2xs"
                                            : "bg-slate-50/70 border-slate-100 hover:bg-slate-100/60"
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`text-xs font-extrabold ${
                                                    !msg.is_read
                                                        ? "text-slate-900"
                                                        : "text-slate-700"
                                                }`}
                                            >
                                                {msg.sender_name}
                                            </span>
                                            <span className="text-[11px] text-slate-400 font-semibold">
                                                ({msg.sender_id_number})
                                            </span>
                                        </div>
                                        {!msg.is_read ? (
                                            <span className="px-2.5 py-0.5 bg-amber-400 text-amber-950 font-extrabold text-[10px] rounded-full uppercase tracking-wider shadow-2xs">
                                                Belum Dibaca
                                            </span>
                                        ) : (
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                                Sudah Dibaca
                                            </span>
                                        )}
                                    </div>
                                    <span className="inline-block px-2.5 py-0.5 bg-teal-50 text-brand-blue text-[10px] font-extrabold rounded-md uppercase mb-1.5 border border-teal-100">
                                        {msg.question_category}
                                    </span>
                                    <p className="text-xs text-slate-600 line-clamp-2 font-medium leading-relaxed">
                                        {msg.message_body}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-slate-400 text-xs font-medium">
                                Belum ada pesan masuk terbaru.
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Documents Card */}
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-teal-50 text-brand-blue flex items-center justify-center font-bold">
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
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-base font-extrabold text-slate-900">
                                    Dokumen Terbaru
                                </h3>
                                <p className="text-xs text-slate-400 font-medium">
                                    Berkas kurikulum yang baru diunggah
                                </p>
                            </div>
                        </div>
                        <Link
                            href={route("admin.documents.index")}
                            className="text-xs font-extrabold text-brand-blue hover:text-brand-dark flex items-center gap-1 group"
                        >
                            Kelola Dokumen
                            <svg
                                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
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
                        </Link>
                    </div>

                    <div className="space-y-3.5">
                        {recentDocuments && recentDocuments.length > 0 ? (
                            recentDocuments.map((doc) => (
                                <div
                                    key={doc.id}
                                    className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-teal-50/30 transition-colors flex items-center justify-between gap-4"
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span
                                                className={`px-2 py-0.5 text-[10px] font-extrabold rounded uppercase ${
                                                    doc.file_type === "PDF"
                                                        ? "bg-rose-100 text-rose-700"
                                                        : "bg-blue-100 text-blue-700"
                                                }`}
                                            >
                                                {doc.file_type || "PDF"}
                                            </span>
                                            <span className="text-xs text-brand-blue font-extrabold truncate">
                                                {doc.category?.name || "Umum"}
                                            </span>
                                        </div>
                                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                            {doc.title}
                                        </h4>
                                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                                            Tahun: {doc.academic_year} • Ukuran:{" "}
                                            {doc.file_size}
                                        </p>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-extrabold rounded-lg inline-block">
                                            {doc.download_count}x Unduh
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-slate-400 text-xs font-medium">
                                Belum ada dokumen diunggah.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
