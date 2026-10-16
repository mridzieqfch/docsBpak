import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import { useTranslation } from "@/context/LanguageContext";

export default function Pengumuman({ announcements, currentTag, webContents, webContentsEn }) {
    const { lang, t } = useTranslation();
    const currentWebContents = lang === 'en' ? (webContentsEn || {}) : (webContents || {});
    const tags = ["Semua", "Kurikulum", "MBKM", "RPL", "Umum"];

    const getTagLabel = (tagLabel) => {
        if (!tagLabel) return "";
        if (tagLabel === "Semua") return t("news_all", "Semua");
        const lower = tagLabel.toLowerCase();
        if (lower === "kurikulum") return t("news_cat_kurikulum", "Kurikulum");
        if (lower === "mbkm") return t("news_cat_mbkm", "MBKM");
        if (lower === "rpl") return t("news_cat_rpl", "RPL");
        if (lower === "umum") return t("news_cat_umum", "Umum");
        return tagLabel;
    };

    const handleTagClick = (tag) => {
        router.get(
            route("pengumuman"),
            { tag: tag === "Semua" ? "" : tag },
            { preserveState: true },
        );
    };

    const newsBgUrl = webContents?.news_bg_image
        ? webContents.news_bg_image.startsWith("http")
            ? webContents.news_bg_image
            : `/storage/${webContents.news_bg_image}`
        : "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1920&auto=format&fit=crop";

    return (
        <PublicLayout>
            <Head title={t("nav_announcements", "Pengumuman & Berita")} />

            {/* HEADER BANNER */}
            <div
                className="bg-brand-dark py-20 lg:py-28 text-white text-center relative overflow-hidden bg-cover"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(8, 56, 68, 0.88), rgba(14, 90, 106, 0.82)), url('${newsBgUrl}')`,
                    backgroundPosition: "center 45%",
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight drop-shadow-md">
                        {currentWebContents?.news_hero_title ||
                            t("news_hero_title", "Pengumuman & Berita Terbaru")}
                    </h1>
                    <p className="text-teal-100 max-w-2xl mx-auto font-medium text-base sm:text-lg drop-shadow-xs">
                        {currentWebContents?.news_hero_subtitle ||
                            t(
                                "news_hero_subtitle",
                                "Informasi resmi seputar pemutakhiran kurikulum, pendaftaran MBKM, dan kebijakan akademik IT-PLN.",
                            )}
                    </p>
                </div>
            </div>

            {/* CONTENT GRID */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Tag Filter Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                    {tags.map((tag) => {
                        const isActive =
                            currentTag === tag ||
                            (tag === "Semua" && !currentTag);
                        return (
                            <button
                                key={tag}
                                onClick={() => handleTagClick(tag)}
                                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                                    isActive
                                        ? "bg-brand-blue text-white shadow-md"
                                        : "bg-white text-gray-700 hover:bg-teal-50 border border-gray-200"
                                }`}
                            >
                                {getTagLabel(tag)}
                            </button>
                        );
                    })}
                </div>

                {/* Grid Articles */}
                {announcements.data && announcements.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {announcements.data.map((item) => (
                            <article
                                key={item.id}
                                className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden flex flex-col hover:shadow-md transition-all"
                            >
                                {item.image_path ? (
                                    <img
                                        src={`/storage/${item.image_path}`}
                                        alt={
                                            lang === "en" && item.title_en
                                                ? item.title_en
                                                : item.title
                                        }
                                        className="h-48 w-full object-cover"
                                    />
                                ) : (
                                    <div className="h-48 w-full bg-teal-800 text-teal-100 flex items-center justify-center font-bold text-lg p-6 text-center">
                                        {lang === "en" && item.title_en
                                            ? item.title_en
                                            : item.title}
                                    </div>
                                )}

                                <div className="p-6 flex flex-col flex-grow justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-2">
                                            <span className="text-brand-blue uppercase">
                                                {getTagLabel(item.tag_category)}
                                            </span>
                                            <span>•</span>
                                            <span>
                                                {item.published_at
                                                    ? new Date(
                                                          item.published_at,
                                                      ).toLocaleDateString(
                                                          lang === "en"
                                                              ? "en-US"
                                                              : "id-ID",
                                                          {
                                                              year: "numeric",
                                                              month: "short",
                                                              day: "numeric",
                                                          },
                                                      )
                                                    : "-"}
                                            </span>
                                        </div>
                                        <h2 className="text-lg font-bold text-brand-dark mb-3 line-clamp-2">
                                            {lang === "en" && item.title_en
                                                ? item.title_en
                                                : item.title}
                                        </h2>
                                        <p className="text-xs text-gray-600 font-medium line-clamp-3 mb-6">
                                            {lang === "en"
                                                ? item.excerpt_en ||
                                                  item.content_en ||
                                                  item.excerpt ||
                                                  item.content
                                                : item.excerpt || item.content}
                                        </p>
                                    </div>

                                    <Link
                                        href={route(
                                            "pengumuman.detail",
                                            item.slug,
                                        )}
                                        className="inline-flex items-center font-bold text-xs text-brand-blue hover:text-brand-dark transition-colors"
                                    >
                                        {t(
                                            "news_read_more",
                                            "Baca Selengkapnya",
                                        )}{" "}
                                        →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-gray-500 font-medium">
                        {lang === "en"
                            ? "No announcements available yet."
                            : "Belum ada pengumuman yang diterbitkan."}
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
