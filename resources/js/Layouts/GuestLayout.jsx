import React from "react";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children, title = "Portal Staf BPAK" }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center font-sans antialiased">
            <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
                {/* LEFT COLUMN: ACADEMIC REPOSITORY HERO & ILLUSTRATION (Hidden on mobile, 7 cols on LG) */}
                <div className="hidden lg:flex lg:col-span-7 bg-gradient-to-br from-[#083844] via-[#0e5a6a] to-[#062a33] text-white p-12 flex-col justify-between relative overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

                    {/* Top Brand Header */}
                    <div className="relative z-10 flex items-center gap-3">
                        <Link
                            href={route("home")}
                            className="flex items-center gap-3 group"
                        >
                            <div>
                                <h1 className="font-extrabold text-lg text-white tracking-tight leading-tight mb-1">
                                    BPAK IT-PLN
                                </h1>
                                <p className="text-xs font-semibold text-teal-200/90 tracking-wider">
                                    Bagian Pengembangan Akademik
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Center Academic Document Repository SVG Illustration */}
                    <div className="relative z-10 my-auto flex flex-col items-center text-center py-8">
                        <div className="w-full max-w-md mb-8">
                            <svg
                                viewBox="0 0 500 400"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-auto drop-shadow-2xl"
                            >
                                {/* Base Platform */}
                                <ellipse
                                    cx="250"
                                    cy="350"
                                    rx="210"
                                    ry="35"
                                    fill="#042129"
                                    fillOpacity="0.6"
                                />

                                {/* Background Glow Grid */}
                                <path
                                    d="M100 350L250 260L400 350"
                                    stroke="#147b90"
                                    strokeWidth="2"
                                    strokeDasharray="4 4"
                                    strokeOpacity="0.5"
                                />

                                {/* Main Repository Cabinet / Folder Stack */}
                                <rect
                                    x="150"
                                    y="160"
                                    width="200"
                                    height="150"
                                    rx="16"
                                    fill="#0e5a6a"
                                    stroke="#1eb4d3"
                                    strokeWidth="3"
                                />
                                <rect
                                    x="165"
                                    y="180"
                                    width="170"
                                    height="35"
                                    rx="8"
                                    fill="#083844"
                                />
                                <circle
                                    cx="185"
                                    cy="197.5"
                                    r="4"
                                    fill="#fdb813"
                                />
                                <rect
                                    x="200"
                                    y="194"
                                    width="80"
                                    height="7"
                                    rx="3.5"
                                    fill="#e2f1f4"
                                    opacity="0.9"
                                />

                                <rect
                                    x="165"
                                    y="225"
                                    width="170"
                                    height="35"
                                    rx="8"
                                    fill="#083844"
                                />
                                <circle
                                    cx="185"
                                    cy="242.5"
                                    r="4"
                                    fill="#38bdf8"
                                />
                                <rect
                                    x="200"
                                    y="239"
                                    width="100"
                                    height="7"
                                    rx="3.5"
                                    fill="#e2f1f4"
                                    opacity="0.9"
                                />

                                <rect
                                    x="165"
                                    y="270"
                                    width="170"
                                    height="30"
                                    rx="8"
                                    fill="#083844"
                                />
                                <circle
                                    cx="185"
                                    cy="285"
                                    r="4"
                                    fill="#10b981"
                                />
                                <rect
                                    x="200"
                                    y="281.5"
                                    width="60"
                                    height="7"
                                    rx="3.5"
                                    fill="#e2f1f4"
                                    opacity="0.9"
                                />

                                {/* Document File Sheets Floating */}
                                {/* Sheet 1 (Left) */}
                                <g transform="translate(90, 80) rotate(-12)">
                                    <rect
                                        width="110"
                                        height="150"
                                        rx="10"
                                        fill="#ffffff"
                                        shadow="0 10px 20px rgba(0,0,0,0.3)"
                                    />
                                    <rect
                                        x="15"
                                        y="18"
                                        width="80"
                                        height="10"
                                        rx="4"
                                        fill="#0e5a6a"
                                    />
                                    <rect
                                        x="15"
                                        y="38"
                                        width="60"
                                        height="6"
                                        rx="3"
                                        fill="#cbd5e1"
                                    />
                                    <rect
                                        x="15"
                                        y="52"
                                        width="75"
                                        height="6"
                                        rx="3"
                                        fill="#e2e8f0"
                                    />
                                    <rect
                                        x="15"
                                        y="66"
                                        width="70"
                                        height="6"
                                        rx="3"
                                        fill="#e2e8f0"
                                    />
                                    <rect
                                        x="15"
                                        y="80"
                                        width="45"
                                        height="6"
                                        rx="3"
                                        fill="#e2e8f0"
                                    />
                                    <circle
                                        cx="80"
                                        cy="120"
                                        r="14"
                                        fill="#fdb813"
                                    />
                                    <path
                                        d="M74 120L78 124L86 116"
                                        stroke="#083844"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </g>

                                {/* Sheet 2 (Right Front - Main OBE Document) */}
                                <g transform="translate(290, 90) rotate(8)">
                                    <rect
                                        width="115"
                                        height="155"
                                        rx="10"
                                        fill="#ffffff"
                                    />
                                    <rect
                                        x="15"
                                        y="18"
                                        width="85"
                                        height="10"
                                        rx="4"
                                        fill="#fdb813"
                                    />
                                    <rect
                                        x="15"
                                        y="38"
                                        width="70"
                                        height="6"
                                        rx="3"
                                        fill="#083844"
                                    />
                                    <rect
                                        x="15"
                                        y="52"
                                        width="85"
                                        height="6"
                                        rx="3"
                                        fill="#cbd5e1"
                                    />
                                    <rect
                                        x="15"
                                        y="66"
                                        width="80"
                                        height="6"
                                        rx="3"
                                        fill="#e2e8f0"
                                    />
                                    <rect
                                        x="15"
                                        y="80"
                                        width="65"
                                        height="6"
                                        rx="3"
                                        fill="#e2e8f0"
                                    />
                                    <rect
                                        x="15"
                                        y="105"
                                        width="40"
                                        height="18"
                                        rx="4"
                                        fill="#0e5a6a"
                                    />
                                    <text
                                        x="23"
                                        y="118"
                                        fill="#ffffff"
                                        fontSize="9"
                                        fontWeight="bold"
                                        fontFamily="sans-serif"
                                    >
                                        PDF
                                    </text>
                                </g>

                                {/* Floating Academic Shield Badge */}
                                <g transform="translate(210, 45)">
                                    <path
                                        d="M40 0L80 15V45C80 70 40 90 40 90C40 90 0 70 0 45V15L40 0Z"
                                        fill="#fdb813"
                                    />
                                    <path
                                        d="M40 8L72 20V43C72 63 40 79 40 79C40 79 8 63 8 43V20L40 8Z"
                                        fill="#083844"
                                    />
                                    <text
                                        x="24"
                                        y="52"
                                        fill="#fdb813"
                                        fontSize="26"
                                        fontWeight="900"
                                        fontFamily="sans-serif"
                                    >
                                        IT
                                    </text>
                                </g>
                            </svg>
                        </div>

                        <h2 className="text-2xl font-extrabold text-white tracking-tight mb-2">
                            Repositori Dokumen Kurikulum Digital
                        </h2>
                        <p className="text-sm text-teal-100 max-w-md font-medium leading-relaxed">
                            Sistem Pengelolaan Terpusat untuk Kurikulum Berbasis
                            OBE, Dokumen MBKM, Panduan RPL, dan Regulasi
                            Akademik IT-PLN.
                        </p>
                    </div>

                    {/* Bottom Back Button & Footer Note */}
                    <div className="relative z-10 flex items-center justify-between border-t border-teal-800/80 pt-6">
                        <Link
                            href={route("home")}
                            className="inline-flex items-center text-xs font-bold text-teal-200 hover:text-white transition-colors"
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
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Kembali ke Halaman Utama
                        </Link>
                        <span className="text-[11px] text-teal-300/80 font-medium">
                            © 2026 BPAK Institut Teknologi PLN
                        </span>
                    </div>
                </div>

                {/* RIGHT COLUMN: LOGIN FORM CARD (12 cols on mobile, 5 cols on LG) */}
                <div className="col-span-1 lg:col-span-5 flex items-center justify-center p-6 sm:p-12 bg-brand-light">
                    <div className="w-full max-w-md space-y-6">
                        {/* Mobile Header Brand Logo (Visible only on mobile) */}
                        <div className="lg:hidden flex flex-col items-center text-center mb-6">
                            <Link href={route("home")}>
                                <img
                                    src="/assets/img/LOGO_IT_PLN.png"
                                    alt="Logo IT-PLN"
                                    className="h-14 w-auto bg-white p-2 rounded-2xl shadow-md mb-3"
                                />
                            </Link>
                            <h2 className="font-extrabold text-xl text-brand-dark">
                                BPAK IT-PLN
                            </h2>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                                Bagian Pengembangan Akademik
                            </p>
                        </div>

                        {/* Form Inner Card */}
                        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-xl relative overflow-hidden">
                            {children}
                        </div>

                        {/* Mobile Back Link */}
                        <div className="lg:hidden text-center">
                            <Link
                                href={route("home")}
                                className="inline-flex items-center text-xs font-bold text-gray-500 hover:text-brand-blue transition-colors"
                            >
                                <svg
                                    className="w-4 h-4 mr-1"
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
                                Kembali ke Beranda Utama
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
