import React from "react";
import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import { useTranslation } from "@/context/LanguageContext";

export default function PengumumanDetail({
    announcement,
    recentAnnouncements,
}) {
    const { lang, t } = useTranslation();

    const getTagLabel = (tagLabel) => {
        if (!tagLabel) return "";
        const lower = tagLabel.toLowerCase();
        if (lower === "kurikulum") return t("news_cat_kurikulum", "Kurikulum");
        if (lower === "mbkm") return t("news_cat_mbkm", "MBKM");
        if (lower === "rpl") return t("news_cat_rpl", "RPL");
        if (lower === "umum") return t("news_cat_umum", "Umum");
        return tagLabel;
    };

    return (
        <PublicLayout>
            <Head title={`${announcement.title}`} />

            {/* HEADER BANNER */}
            <div className="bg-brand-dark py-12 text-white relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href={route("pengumuman")}
                        className="inline-flex items-center text-xs font-bold text-teal-200 hover:text-white mb-6 transition-colors"
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
                        {t('news_back_list', 'Kembali ke Pengumuman')}
                    </Link>

                    <div className="flex items-center gap-3 text-xs font-bold text-teal-200 mb-3">
                        <span className="px-2.5 py-1 bg-brand-yellow text-brand-dark rounded-md uppercase tracking-wider">
                            {getTagLabel(announcement.tag_category)}
                        </span>
                        <span>•</span>
                        <span>
                            {announcement.published_at
                                ? new Date(
                                      announcement.published_at,
                                  ).toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                  })
                                : ""}
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                        {lang === 'en' && announcement.title_en ? announcement.title_en : announcement.title}
                    </h1>

                    <p className="text-sm text-teal-100 font-medium">
                        {lang === 'en' ? 'Published by:' : 'Dipublikasikan oleh:'}{" "}
                        {announcement.author?.name || "Admin BPAK"}
                    </p>
                </div>
            </div>

            {/* CONTENT BODY */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-xs mb-16">
                    {announcement.image_path && (
                        <img
                            src={`/storage/${announcement.image_path}`}
                            alt={lang === 'en' && announcement.title_en ? announcement.title_en : announcement.title}
                            className="w-full max-h-96 object-cover rounded-2xl mb-8"
                        />
                    )}

                    {/* Rich HTML Content */}
                    <div
                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-medium"
                        dangerouslySetInnerHTML={{
                            __html: lang === 'en' && announcement.content_en ? announcement.content_en : announcement.content,
                        }}
                    />
                </div>

                {/* RECENT ANNOUNCEMENTS */}
                {recentAnnouncements && recentAnnouncements.length > 0 && (
                    <div className="border-t border-gray-200 pt-12">
                        <h2 className="text-xl font-extrabold text-brand-dark mb-6">
                            {t('news_recent', 'Pengumuman Terbaru Lainnya')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {recentAnnouncements.map((item) => (
                                <Link
                                    key={item.id}
                                    href={route("pengumuman.detail", item.slug)}
                                    className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                                >
                                    <div>
                                        <span className="text-[10px] font-bold uppercase text-brand-blue block mb-1">
                                            {item.tag_category}
                                        </span>
                                        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2">
                                            {lang === 'en' && item.title_en ? item.title_en : item.title}
                                        </h3>
                                    </div>
                                    <span className="text-[11px] text-gray-400 font-medium mt-4">
                                        {item.published_at
                                            ? new Date(
                                                  item.published_at,
                                              ).toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', {
                                                  month: "short",
                                                  day: "numeric",
                                              })
                                            : ""}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
