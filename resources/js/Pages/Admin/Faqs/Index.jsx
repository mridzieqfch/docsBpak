import React, { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal";

export default function FaqsIndex({ faqs }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        question: "",
        question_en: "",
        answer: "",
        answer_en: "",
        order_number: 0,
    });

    const openCreateModal = () => {
        setEditingFaq(null);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (faq) => {
        setEditingFaq(faq);
        setData({
            question: faq.question,
            question_en: faq.question_en || "",
            answer: faq.answer,
            answer_en: faq.answer_en || "",
            order_number: faq.order_number || 0,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingFaq(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingFaq) {
            put(route("admin.faqs.update", editingFaq.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route("admin.faqs.store"), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus item FAQ ini?")) {
            router.delete(route("admin.faqs.destroy", id));
        }
    };

    return (
        <AdminLayout header="Kelola FAQ & Tanya Jawab">
            <Head title="Kelola FAQ" />

            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">
                            Daftar FAQ Layanan
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                            Kelola pertanyaan umum dan jawaban resmi BPAK IT-PLN
                        </p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center px-4 py-2.5 bg-brand-blue hover:bg-brand-dark text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
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
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Tambah FAQ Baru
                    </button>
                </div>

                <div className="divide-y divide-gray-100">
                    {faqs && faqs.length > 0 ? (
                        faqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="p-6 hover:bg-teal-50/20 transition-colors flex items-start justify-between gap-4"
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 bg-teal-50 text-brand-blue font-extrabold text-[10px] rounded">
                                            Urutan #{faq.order_number}
                                        </span>
                                        <h4 className="text-base font-bold text-gray-900">
                                            {faq.question}
                                        </h4>
                                    </div>
                                    <p className="text-xs text-gray-600 font-medium leading-relaxed pt-1">
                                        {faq.answer}
                                    </p>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                        onClick={() => openEditModal(faq)}
                                        title="Edit FAQ"
                                        className="p-2 bg-slate-100 hover:bg-brand-blue text-slate-700 hover:text-white rounded-xl transition-all shadow-2xs inline-flex items-center justify-center"
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
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(faq.id)}
                                        title="Hapus FAQ"
                                        className="p-2 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white rounded-xl transition-all shadow-2xs inline-flex items-center justify-center"
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
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500 text-sm">
                            Belum ada item FAQ ditambahkan.
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Form */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="lg">
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                        {editingFaq ? "Edit Item FAQ" : "Tambah Item FAQ Baru"}
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                Pertanyaan (Bahasa Indonesia)
                            </label>
                            <input
                                type="text"
                                value={data.question}
                                onChange={(e) =>
                                    setData("question", e.target.value)
                                }
                                placeholder="Masukkan kalimat pertanyaan..."
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue font-bold"
                                required
                            />
                            {errors.question && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.question}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                Pertanyaan (English - Opsional)
                            </label>
                            <input
                                type="text"
                                value={data.question_en}
                                onChange={(e) =>
                                    setData("question_en", e.target.value)
                                }
                                placeholder="Biarkan kosong untuk terjemahkan otomatis"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue"
                            />
                            {errors.question_en && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.question_en}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                Jawaban Resmi (Bahasa Indonesia)
                            </label>
                            <textarea
                                rows={3}
                                value={data.answer}
                                onChange={(e) =>
                                    setData("answer", e.target.value)
                                }
                                placeholder="Tuliskan jawaban resmi secara rinci..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue"
                                required
                            />
                            {errors.answer && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.answer}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                Jawaban Resmi (English - Opsional)
                            </label>
                            <textarea
                                rows={3}
                                value={data.answer_en}
                                onChange={(e) =>
                                    setData("answer_en", e.target.value)
                                }
                                placeholder="Biarkan kosong untuk terjemahkan otomatis"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue"
                            />
                            {errors.answer_en && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.answer_en}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                Urutan Tampil
                            </label>
                            <input
                                type="number"
                                value={data.order_number}
                                onChange={(e) =>
                                    setData(
                                        "order_number",
                                        parseInt(e.target.value) || 0,
                                    )
                                }
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 py-2 bg-brand-blue hover:bg-brand-dark text-white font-bold text-xs rounded-xl"
                        >
                            {processing ? "Menyimpan..." : "Simpan FAQ"}
                        </button>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
