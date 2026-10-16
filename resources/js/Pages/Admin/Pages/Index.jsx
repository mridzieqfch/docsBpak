import React, { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal";
import QuillEditor from "@/Components/QuillEditor";

export default function PagesIndex({ pages }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPage, setEditingPage] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: "",
        title_en: "",
        content: "",
        content_en: "",
        show_in_navbar: false,
    });

    const openCreateModal = () => {
        setEditingPage(null);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (pageItem) => {
        setEditingPage(pageItem);
        setData({
            title: pageItem.title,
            title_en: pageItem.title_en || "",
            content: pageItem.content || "",
            content_en: pageItem.content_en || "",
            show_in_navbar: Boolean(pageItem.show_in_navbar),
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingPage(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingPage) {
            put(route("admin.pages.update", editingPage.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route("admin.pages.store"), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus halaman dinamis ini?")) {
            router.delete(route("admin.pages.destroy", id));
        }
    };

    return (
        <AdminLayout header="Kelola Halaman Dinamis">
            <Head title="Halaman Dinamis" />

            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">
                            Daftar Halaman Dinamis
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                            Buat halaman kustom baru yang otomatis tampil di
                            menu navigasi publik
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
                        Buat Halaman Baru
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-[11px] font-extrabold uppercase tracking-wider text-gray-500 border-b border-gray-100">
                                <th className="py-3.5 px-6">Judul Halaman</th>
                                <th className="py-3.5 px-6">Slug URL</th>
                                <th className="py-3.5 px-6">
                                    Tampil di Navbar
                                </th>
                                <th className="py-3.5 px-6">Penulis</th>
                                <th className="py-3.5 px-6 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
                            {pages && pages.length > 0 ? (
                                pages.map((pg) => (
                                    <tr
                                        key={pg.id}
                                        className="hover:bg-teal-50/30 transition-colors"
                                    >
                                        <td className="py-4 px-6 font-bold text-gray-900">
                                            {pg.title}
                                        </td>
                                        <td className="py-4 px-6 text-xs font-mono text-gray-500">
                                            /p/{pg.slug}
                                        </td>
                                        <td className="py-4 px-6">
                                            {pg.show_in_navbar ? (
                                                <span className="px-2.5 py-1 bg-teal-100 text-teal-800 text-xs font-extrabold rounded-md uppercase">
                                                    Ya (Dropdown Navbar)
                                                </span>
                                            ) : (
                                                <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-md">
                                                    Tidak
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-xs text-gray-500">
                                            {pg.author?.name || "Staf BPAK"}
                                        </td>
                                        <td className="py-4 px-6 text-right space-x-1.5">
                                            <a
                                                href={route(
                                                    "page.detail",
                                                    pg.slug,
                                                )}
                                                target="_blank"
                                                rel="noreferrer"
                                                title="Pratinjau Halaman"
                                                className="p-2 bg-teal-50 hover:bg-teal-600 text-brand-blue hover:text-white rounded-xl transition-all shadow-2xs inline-flex items-center justify-center"
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
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                </svg>
                                            </a>
                                            <button
                                                onClick={() =>
                                                    openEditModal(pg)
                                                }
                                                title="Edit Halaman"
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
                                                onClick={() =>
                                                    handleDelete(pg.id)
                                                }
                                                title="Hapus Halaman"
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
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-8 text-center text-gray-500"
                                    >
                                        Belum ada halaman dinamis dibuat.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Form */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                        {editingPage
                            ? "Edit Halaman Dinamis"
                            : "Buat Halaman Dinamis Baru"}
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                Judul Halaman (Bahasa Indonesia)
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                placeholder="Contoh: Sejarah Kurikulum IT-PLN"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue font-bold"
                                required
                            />
                            {errors.title && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                Judul Halaman (English - Opsional)
                            </label>
                            <input
                                type="text"
                                value={data.title_en}
                                onChange={(e) =>
                                    setData("title_en", e.target.value)
                                }
                                placeholder="Biarkan kosong untuk terjemahkan otomatis"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue font-bold"
                            />
                            {errors.title_en && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.title_en}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <input
                                type="checkbox"
                                id="show_in_navbar"
                                checked={data.show_in_navbar}
                                onChange={(e) =>
                                    setData("show_in_navbar", e.target.checked)
                                }
                                className="w-4 h-4 text-brand-blue focus:ring-brand-blue border-gray-300 rounded"
                            />
                            <label
                                htmlFor="show_in_navbar"
                                className="text-xs font-bold text-gray-800 cursor-pointer"
                            >
                                Tampilkan otomatis link halaman ini di Dropdown
                                Menu Navigasi Publik ("Lainnya")
                            </label>
                        </div>

                        {/* Rich Content Editor (Quill.js) */}
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                                Konten Halaman (Quill.js Editor)
                            </label>
                            <QuillEditor
                                value={data.content}
                                onChange={(contentHtml) =>
                                    setData("content", contentHtml)
                                }
                                placeholder="Tuliskan isi konten halaman..."
                                minHeight="240px"
                            />
                            {errors.content && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.content}
                                </p>
                            )}
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
                            {processing ? "Menyimpan..." : "Simpan Halaman"}
                        </button>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
