import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import ImageUploadModal from "@/Components/ImageUploadModal";

export default function HeroImagesIndex({ images }) {
    const defaultDefaults = {
        hero_bg_image:
            "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop",
        doc_bg_image:
            "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1920&auto=format&fit=crop",
        news_bg_image:
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1920&auto=format&fit=crop",
        panduan_bg_image:
            "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1920&auto=format&fit=crop",
        faq_bg_image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1920&auto=format&fit=crop",
        struct_manager_image:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop",
        struct_deputy1_image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
        struct_deputy2_image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    };

    const { data, setData, post, processing, errors } = useForm({
        hero_bg_image: null,
        doc_bg_image: null,
        news_bg_image: null,
        panduan_bg_image: null,
        faq_bg_image: null,
        struct_manager_image: null,
        struct_deputy1_image: null,
        struct_deputy2_image: null,

        reset_hero_bg_image: false,
        reset_doc_bg_image: false,
        reset_news_bg_image: false,
        reset_panduan_bg_image: false,
        reset_faq_bg_image: false,
        reset_struct_manager_image: false,
        reset_struct_deputy1_image: false,
        reset_struct_deputy2_image: false,
    });

    const [activeTab, setActiveTab] = useState("all");
    const [previews, setPreviews] = useState({});
    const [modalState, setModalState] = useState({
        open: false,
        cardKey: "",
        cardTitle: "",
        cardRec: "",
    });

    const handleFileChange = (key, file) => {
        if (file) {
            setData((prevData) => ({
                ...prevData,
                [key]: file,
                [`reset_${key}`]: false,
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews((prev) => ({ ...prev, [key]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleResetImage = (key) => {
        setData((prevData) => ({
            ...prevData,
            [key]: null,
            [`reset_${key}`]: true,
        }));
        setPreviews((prev) => ({ ...prev, [key]: null }));
    };

    const openUploadModal = (card) => {
        setModalState({
            open: true,
            cardKey: card.key,
            cardTitle: card.title,
            cardRec: card.rec,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.hero-images.update"), {
            forceFormData: true,
        });
    };

    const heroCards = [
        {
            key: "hero_bg_image",
            title: "Background Banner Beranda (Landing Page)",
            defaultImg: defaultDefaults.hero_bg_image,
            badgeBg: "bg-teal-50 text-brand-blue",
            rec: "Rekomendasi: 1920x1080px (Rasio 16:9, Max 5MB)",
            isPortrait: false,
            icon: (
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
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 01-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                </svg>
            ),
        },
        {
            key: "doc_bg_image",
            title: "Background Banner Halaman Repositori Dokumen",
            defaultImg: defaultDefaults.doc_bg_image,
            badgeBg: "bg-blue-50 text-blue-600",
            rec: "Rekomendasi: 1920x1080px (Rasio 16:9, Max 5MB)",
            isPortrait: false,
            icon: (
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
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                </svg>
            ),
        },
        {
            key: "news_bg_image",
            title: "Background Banner Halaman Pengumuman & Berita",
            defaultImg: defaultDefaults.news_bg_image,
            badgeBg: "bg-purple-50 text-purple-600",
            rec: "Rekomendasi: 1920x1080px (Rasio 16:9, Max 5MB)",
            isPortrait: false,
            icon: (
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
                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.684A1.761 1.761 0 013 12.016V8.984c0-.77.495-1.442 1.217-1.677l9.214-3.071a1.76 1.76 0 012.352 1.677v12.164a1.76 1.76 0 01-2.352 1.677l-4.78-1.593z"
                    />
                </svg>
            ),
        },
        {
            key: "panduan_bg_image",
            title: "Background Banner Halaman Panduan Akademik",
            defaultImg: defaultDefaults.panduan_bg_image,
            badgeBg: "bg-emerald-50 text-emerald-600",
            rec: "Rekomendasi: 1920x1080px (Rasio 16:9, Max 5MB)",
            isPortrait: false,
            icon: (
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
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                </svg>
            ),
        },
        {
            key: "faq_bg_image",
            title: "Background Banner Halaman FAQ & Bantuan",
            defaultImg: defaultDefaults.faq_bg_image,
            badgeBg: "bg-amber-50 text-amber-600",
            rec: "Rekomendasi: 1920x1080px (Rasio 16:9, Max 5MB)",
            isPortrait: false,
            icon: (
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
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
        },
    ];

    const structureCards = [
        {
            key: "struct_manager_image",
            title: "Foto Manager Bagian Pengembangan Akademik",
            subtitle: "Dr. Ir. Muhammad Sofyan, ST., MT",
            defaultImg: defaultDefaults.struct_manager_image,
            badgeBg: "bg-red-50 text-red-600",
            rec: "Rekomendasi: Rasio 3:4 atau 4:5 Portrait, misal 600x800px (WEBP/PNG/JPG, Max 5MB)",
            isPortrait: true,
            icon: (
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
            ),
        },
        {
            key: "struct_deputy1_image",
            title: "Foto Deputi Manager Pengembangan Kurikulum",
            subtitle: "Dr. Ir. Samsurizal, ST., MT., IPM",
            defaultImg: defaultDefaults.struct_deputy1_image,
            badgeBg: "bg-indigo-50 text-indigo-600",
            rec: "Rekomendasi: Rasio 3:4 atau 4:5 Portrait, misal 600x800px (WEBP/PNG/JPG, Max 5MB)",
            isPortrait: true,
            icon: (
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
            ),
        },
        {
            key: "struct_deputy2_image",
            title: "Foto Deputi Manager Sistem Pembelajaran",
            subtitle: "Dody, S.Kom., M.Kom",
            defaultImg: defaultDefaults.struct_deputy2_image,
            badgeBg: "bg-sky-50 text-sky-600",
            rec: "Rekomendasi: Rasio 3:4 atau 4:5 Portrait, misal 600x800px (WEBP/PNG/JPG, Max 5MB)",
            isPortrait: true,
            icon: (
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
            ),
        },
    ];

    const renderCard = (card) => {
        const currentPath = images?.[card.key];
        const isReset = data[`reset_${card.key}`];
        const newFileSelected = data[card.key];

        let displayImgUrl = card.defaultImg;
        if (previews[card.key]) {
            displayImgUrl = previews[card.key];
        } else if (currentPath && !isReset) {
            displayImgUrl = currentPath.startsWith("http")
                ? currentPath
                : `/storage/${currentPath}`;
        }

        const isCustom = (currentPath || previews[card.key]) && !isReset;

        return (
            <div
                key={card.key}
                className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
                <div>
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                        <div
                            className={`w-8 h-8 rounded-xl ${card.badgeBg} flex items-center justify-center font-bold text-sm`}
                        >
                            {card.icon}
                        </div>
                        <div>
                            <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                                {card.title}
                            </h3>
                            {card.subtitle && (
                                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                                    {card.subtitle}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Image Live Preview Box */}
                    <div
                        className={`relative rounded-2xl overflow-hidden mb-4 bg-slate-900 border border-slate-200 shadow-inner group ${
                            card.isPortrait ? "h-64 sm:h-72" : "h-44"
                        }`}
                    >
                        <img
                            src={displayImgUrl}
                            alt={card.title}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Overlay label */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#083844]/90 via-transparent to-transparent flex flex-col justify-end p-4 text-white pointer-events-none">
                            <span className="text-[10px] font-bold text-yellow-300 tracking-widest">
                                Pratinjau Gambar
                            </span>
                            <h4 className="text-sm font-extrabold line-clamp-1 drop-shadow-md">
                                {card.subtitle || card.title}
                            </h4>
                        </div>
                    </div>
                </div>

                {/* Controls & Action Buttons */}
                <div className="space-y-3">
                    <span className="text-[11px] font-medium text-slate-500 block">
                        {card.rec}
                    </span>

                    {/* Status Badge */}
                    {newFileSelected && (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="truncate">
                                Berkas Baru: {newFileSelected.name}
                            </span>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => openUploadModal(card)}
                            className="flex-1 py-2.5 px-4 bg-teal-50 hover:bg-teal-100 text-brand-blue border border-teal-200/80 rounded-xl font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-2"
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
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            {isCustom
                                ? "Ganti Foto / Gambar"
                                : "Pilih / Upload Gambar"}
                        </button>

                        {isCustom && (
                            <button
                                type="button"
                                onClick={() => handleResetImage(card.key)}
                                className="py-2.5 px-3.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold transition-colors shrink-0"
                            >
                                Reset Default
                            </button>
                        )}
                    </div>

                    {errors[card.key] && (
                        <p className="text-xs text-rose-600 font-semibold mt-1">
                            {errors[card.key]}
                        </p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <AdminLayout header="Kelola Gambar">
            <Head title="Kelola Gambar" />

            <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
                <button
                    type="button"
                    onClick={() => setActiveTab("all")}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                        activeTab === "all"
                            ? "bg-brand-blue text-white shadow-xs"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                >
                    Semua Gambar
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("hero")}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                        activeTab === "hero"
                            ? "bg-brand-blue text-white shadow-xs"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                >
                    Background Hero Banner ({heroCards.length})
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("structure")}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                        activeTab === "structure"
                            ? "bg-brand-blue text-white shadow-xs"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                >
                    Foto Struktur Organisasi ({structureCards.length})
                </button>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-10">
                {/* SECTION 1: HERO BANNER BACKGROUND IMAGES */}
                {(activeTab === "all" || activeTab === "hero") && (
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                            <span className="w-3 h-3 rounded-full bg-brand-blue"></span>
                            <h2 className="text-lg font-extrabold text-slate-900">
                                Gambar Background Hero Banner Page
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                            {heroCards.map(renderCard)}
                        </div>
                    </section>
                )}

                {/* SECTION 2: BPAK ORGANIZATIONAL STRUCTURE PHOTOS */}
                {(activeTab === "all" || activeTab === "structure") && (
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                            <span className="w-3 h-3 rounded-full bg-red-600"></span>
                            <h2 className="text-lg font-extrabold text-slate-900">
                                Foto Struktur Organisasi BPAK
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                            {structureCards.map(renderCard)}
                        </div>
                    </section>
                )}

                {/* Sticky Submit Bar */}
                <div className="flex justify-end sticky bottom-6 z-20 pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-8 py-3.5 bg-brand-blue hover:bg-brand-dark text-white font-extrabold text-sm rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105 disabled:opacity-50"
                    >
                        {processing
                            ? "Menyimpan Gambar..."
                            : "Simpan Perubahan Gambar"}
                    </button>
                </div>
            </form>

            {/* Modal Drag and Drop Upload */}
            <ImageUploadModal
                show={modalState.open}
                title={modalState.cardTitle}
                recommendation={modalState.cardRec}
                onClose={() => setModalState({ ...modalState, open: false })}
                onSelectFile={(file) =>
                    handleFileChange(modalState.cardKey, file)
                }
            />
        </AdminLayout>
    );
}
