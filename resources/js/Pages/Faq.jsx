import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import { useTranslation } from "@/context/LanguageContext";
import CustomSelect from "@/Components/CustomSelect";

export default function Faq({ faqs, webContents, webContentsEn }) {
    const { lang, t } = useTranslation();
    const currentWebContents = lang === 'en' ? (webContentsEn || {}) : (webContents || {});
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFaq = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        sender_name: "",
        sender_id_number: "",
        question_category: "Kurikulum & RPS",
        message_body: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("faq.submit"), {
            onSuccess: () => reset(),
        });
    };

    const faqBgUrl = webContents?.faq_bg_image
        ? webContents.faq_bg_image.startsWith("http")
            ? webContents.faq_bg_image
            : `/storage/${webContents.faq_bg_image}`
        : "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1920&auto=format&fit=crop";

    return (
        <PublicLayout>
            <Head
                title={t(
                    "faq_hero_title",
                    "Tanya Jawab (FAQ) & Layanan Informasi",
                )}
            />

            {/* HEADER BANNER */}
            <div
                className="bg-brand-dark py-20 lg:py-28 text-white text-center relative overflow-hidden bg-cover"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(8, 56, 68, 0.88), rgba(14, 90, 106, 0.82)), url('${faqBgUrl}')`,
                    backgroundPosition: "center 30%",
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight drop-shadow-md">
                        {currentWebContents?.faq_hero_title ||
                            t(
                                "faq_hero_title",
                                "Tanya Jawab (FAQ) & Layanan Informasi",
                            )}
                    </h1>
                    <p className="text-teal-100 max-w-2xl mx-auto font-medium text-base sm:text-lg drop-shadow-xs">
                        {currentWebContents?.faq_hero_subtitle ||
                            t(
                                "faq_hero_subtitle",
                                "Temukan jawaban atas pertanyaan umum atau kirimkan pertanyaan langsung ke Bagian Pengembangan Akademik IT-PLN.",
                            )}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* LEFT COLUMN: FAQ ACCORDION */}
                    <div className="lg:col-span-7 space-y-4">
                        <h2 className="text-2xl font-extrabold text-brand-dark mb-6">
                            {t("faq_title", "Pertanyaan Sering Diajukan")}
                        </h2>

                        {faqs && faqs.length > 0 ? (
                            faqs.map((faq, idx) => (
                                <div
                                    key={faq.id}
                                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs"
                                >
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full flex items-center justify-between p-6 text-left font-bold text-gray-900 hover:text-brand-blue transition-colors focus:outline-none"
                                    >
                                        <span className="pr-4 leading-snug">
                                            {lang === "en" && faq.question_en
                                                ? faq.question_en
                                                : faq.question}
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-teal-50 text-brand-blue flex items-center justify-center shrink-0">
                                            <svg
                                                className={`w-5 h-5 transition-transform duration-300 ${
                                                    openIndex === idx
                                                        ? "rotate-180"
                                                        : ""
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
                                    {openIndex === idx && (
                                        <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4 font-medium">
                                            {lang === "en" && faq.answer_en
                                                ? faq.answer_en
                                                : faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 text-gray-500 font-medium">
                                {lang === "en"
                                    ? "No FAQ items available."
                                    : "Belum ada daftar FAQ yang tersedia."}
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: INQUIRY FORM */}
                    <div className="lg:col-span-5">
                        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-md sticky top-28">
                            <h3 className="text-xl font-extrabold text-brand-dark mb-2">
                                {t(
                                    "faq_form_title",
                                    "Kirim Pertanyaan Langsung",
                                )}
                            </h3>
                            <p className="text-xs text-gray-500 font-medium mb-6">
                                {lang === "en"
                                    ? "Fill out the form below to send an inquiry directly to the BPAK team."
                                    : "Isi formulir di bawah ini untuk mengirimkan pesan langsung ke tim BPAK."}
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 tracking-wider mb-1.5">
                                        {t("faq_form_name", "Nama Lengkap")}
                                    </label>
                                    <input
                                        type="text"
                                        value={data.sender_name}
                                        onChange={(e) =>
                                            setData(
                                                "sender_name",
                                                e.target.value,
                                            )
                                        }
                                        placeholder={
                                            lang === "en"
                                                ? "Enter full name"
                                                : "Masukkan nama lengkap"
                                        }
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue font-medium"
                                        required
                                    />
                                    {errors.sender_name && (
                                        <p className="text-xs text-red-600 mt-1 font-semibold">
                                            {errors.sender_name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                                        {lang === "en"
                                            ? "NIM / NIDN / Identity Number"
                                            : "NIM / NIDN / Nomor Identitas"}
                                    </label>
                                    <input
                                        type="text"
                                        value={data.sender_id_number}
                                        onChange={(e) =>
                                            setData(
                                                "sender_id_number",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Contoh: 202131001"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue font-medium"
                                        required
                                    />
                                    {errors.sender_id_number && (
                                        <p className="text-xs text-red-600 mt-1 font-semibold">
                                            {errors.sender_id_number}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 tracking-wider mb-1.5">
                                        {t(
                                            "faq_form_subject",
                                            "Subjek Pertanyaan",
                                        )}
                                    </label>
                                    <CustomSelect
                                        value={data.question_category}
                                        onChange={(val) =>
                                            setData("question_category", val)
                                        }
                                        options={[
                                            {
                                                value: "Kurikulum & RPS",
                                                label:
                                                    lang === "en"
                                                        ? "Curriculum & RPS"
                                                        : "Kurikulum & RPS",
                                            },
                                            {
                                                value: "Program MBKM",
                                                label:
                                                    lang === "en"
                                                        ? "Impactful Campus Program"
                                                        : "Program Kampus Berdampak",
                                            },
                                            {
                                                value: "Rekognisi Pembelajaran Lampau (RPL)",
                                                label:
                                                    lang === "en"
                                                        ? "Recognition of Prior Learning (RPL)"
                                                        : "Rekognisi Pembelajaran Lampau (RPL)",
                                            },
                                            {
                                                value: "Informasi Umum & Pedoman",
                                                label:
                                                    lang === "en"
                                                        ? "General Information & Guidelines"
                                                        : "Informasi Umum & Pedoman",
                                            },
                                        ]}
                                    />
                                    {errors.question_category && (
                                        <p className="text-xs text-red-600 mt-1 font-semibold">
                                            {errors.question_category}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 tracking-wider mb-1.5">
                                        {t(
                                            "faq_form_message",
                                            "Pesan / Pertanyaan",
                                        )}
                                    </label>
                                    <textarea
                                        rows="4"
                                        value={data.message_body}
                                        onChange={(e) =>
                                            setData(
                                                "message_body",
                                                e.target.value,
                                            )
                                        }
                                        placeholder={
                                            lang === "en"
                                                ? "Write your inquiry detail here..."
                                                : "Tuliskan rincian pertanyaan Anda di sini..."
                                        }
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue font-medium"
                                        required
                                    ></textarea>
                                    {errors.message_body && (
                                        <p className="text-xs text-red-600 mt-1 font-semibold">
                                            {errors.message_body}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3.5 bg-brand-blue hover:bg-brand-dark text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                                >
                                    {processing
                                        ? lang === "en"
                                            ? "Sending..."
                                            : "Mengirim..."
                                        : t(
                                              "faq_form_send",
                                              "Kirim Pertanyaan",
                                          )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
