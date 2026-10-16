import React, { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal";

export default function CategoriesIndex({ categories }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: "",
        name_en: "",
        order_number: 0,
    });

    const openCreateModal = () => {
        setEditingCategory(null);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (cat) => {
        setEditingCategory(cat);
        setData({
            name: cat.name,
            name_en: cat.name_en || "",
            order_number: cat.order_number || 0,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingCategory) {
            put(route("admin.categories.update", editingCategory.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route("admin.categories.store"), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (
            confirm("Apakah Anda yakin ingin menghapus kategori dokumen ini?")
        ) {
            router.delete(route("admin.categories.destroy", id));
        }
    };

    return (
        <AdminLayout header="Kelola Kategori Dokumen">
            <Head title="Kategori Dokumen" />

            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                {/* Header Action Bar */}
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">
                            Daftar Kategori Dokumen
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                            Pengelompokan dokumen repositori kurikulum
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
                        Tambah Kategori Baru
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-[11px] font-extrabold uppercase tracking-wider text-gray-500 border-b border-gray-100">
                                <th className="py-3.5 px-6">Urutan</th>
                                <th className="py-3.5 px-6">Nama Kategori</th>
                                <th className="py-3.5 px-6">Slug URL</th>
                                <th className="py-3.5 px-6">Jumlah Dokumen</th>
                                <th className="py-3.5 px-6 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
                            {categories && categories.length > 0 ? (
                                categories.map((cat) => (
                                    <tr
                                        key={cat.id}
                                        className="hover:bg-teal-50/30 transition-colors"
                                    >
                                        <td className="py-4 px-6 font-bold text-brand-blue">
                                            {cat.order_number}
                                        </td>
                                        <td className="py-4 px-6 font-bold text-gray-900">
                                            {cat.name}
                                        </td>
                                        <td className="py-4 px-6 text-xs text-gray-500 font-mono">
                                            {cat.slug}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="px-2.5 py-1 bg-teal-50 text-teal-800 text-xs font-bold rounded-md">
                                                {cat.documents_count || 0}{" "}
                                                Berkas
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right space-x-1.5">
                                            <button
                                                onClick={() =>
                                                    openEditModal(cat)
                                                }
                                                title="Edit Kategori"
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
                                                    handleDelete(cat.id)
                                                }
                                                title="Hapus Kategori"
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
                                        Belum ada kategori dokumen ditambahkan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Form */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="md">
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                        {editingCategory
                            ? "Edit Kategori Dokumen"
                            : "Tambah Kategori Dokumen Baru"}
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                Nama Kategori (Bahasa Indonesia)
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Contoh: Kurikulum S1 Teknik Elektro"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue"
                                required
                            />
                            {errors.name && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                Nama Kategori (English - Opsional)
                            </label>
                            <input
                                type="text"
                                value={data.name_en}
                                onChange={(e) =>
                                    setData("name_en", e.target.value)
                                }
                                placeholder="Biarkan kosong untuk terjemahkan otomatis"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue"
                            />
                            {errors.name_en && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.name_en}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                Nomor Urut Tampil
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
                            {errors.order_number && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.order_number}
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
                            {processing ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
