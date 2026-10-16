import React from "react";
import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import { useTranslation } from "@/context/LanguageContext";

export default function PageDetail({ page }) {
    const { lang, t } = useTranslation();

    const getTranslatedTitle = () => {
        if (lang === 'en' && page.title_en) return page.title_en;
        if (lang !== 'en') return page.title;
        const lower = page.title.toLowerCase();
        if (lower.includes("akreditasi")) return "International Accreditation";
        if (lower.includes("kemitraan")) return "Industry Partnership";
        if (lower.includes("sejarah")) return "Curriculum History";
        return page.title;
    };

    const getTranslatedContent = () => {
        if (lang === 'en' && page.content_en) return page.content_en;
        if (lang !== 'en') return page.content;
        const lower = page.title.toLowerCase();
        if (lower.includes("akreditasi")) {
            return `
                <p><strong>Enhancing Standards Towards Global Reputation</strong></p>
                <p>The Academic Development Division assists study programs in preparing self-evaluation documents and PLO achievement towards international accreditation such as IABEE and ASIIN.</p>
            `;
        }
        return page.content;
    };

    const title = getTranslatedTitle();
    const content = getTranslatedContent();

    return (
        <PublicLayout>
            <Head title={`${title}`} />

            {/* HEADER BANNER */}
            <div className="bg-brand-dark py-16 text-white text-center relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-brand-yellow bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-white/10">
                        {lang === 'en' ? 'Information Page' : 'Halaman Informasi'}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                        {title}
                    </h1>
                    <p className="text-teal-100 max-w-2xl mx-auto font-medium text-sm sm:text-base">
                        {lang === 'en' ? 'Authored by' : 'Disusun oleh'} {page.author?.name || "Administrator BPAK"}
                    </p>
                </div>
            </div>

            {/* CONTENT BODY */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-xs">
                    <div
                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-medium"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
            </div>
        </PublicLayout>
    );
}
