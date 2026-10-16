import React, { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal";
import QuillEditor from "@/Components/QuillEditor";
import CustomSelect from "@/Components/CustomSelect";
import CustomDatePicker from "@/Components/CustomDatePicker";

export default function AnnouncementsIndex({ announcements }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        title_en: "",
        tag_category: "Kurikulum",
        excerpt: "",
        excerpt_en: "",
        content: "",
        content_en: "",
        published_at: new Date().toISOString().split("T")[0],
        image: null,
    });

    const openCreateModal = () => {
        setEditingAnnouncement(null);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingAnnouncement(item);
        setData({
            title: item.title,
            title_en: item.title_en || "",
            tag_category: item.tag_category,
            excerpt: item.excerpt || "",
            excerpt_en: item.excerpt_en || "",
            content: item.content || "",
            content_en: item.content_en || "",
            published_at: item.published_at
                ? new Date(item.published_at).toISOString().split("T")[0]
                : "",
            image: null,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingAnnouncement(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingAnnouncement) {
            router.post(
                route("admin.announcements.update", editingAnnouncement.id),
                {
                    _method: "put",
                    ...data,
                },
                {
                    onSuccess: () => closeModal(),
                },
            );
        } else {
            post(route("admin.announcements.store"), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) {
            router.delete(route("admin.announcements.destroy", id));
        }
    };

    return (
        <AdminLayout header="Kelola Pengumuman & Berita">
            <Head title="Pengumuman & Berita" />

            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">
                            Daftar Pengumuman Resmi
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                            Publikasikan warta akademik, MBKM, RPL, dan
                            kurikulum
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
                        Buat Pengumuman Baru
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-[11px] font-extrabold tracking-wider text-gray-500 border-b border-gray-100">
                                <th className="py-3.5 px-6">Kategori</th>
                                <th className="py-3.5 px-6">
                                    Judul Pengumuman
                                </th>
                                <th className="py-3.5 px-6">Penulis</th>
                                <th className="py-3.5 px-6">Tanggal Rilis</th>
                                <th className="py-3.5 px-6 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
                            {announcements && announcements.length > 0 ? (
                                announcements.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-teal-50/30 transition-colors"
                                    >
                                        <td className="py-4 px-6">
                                            <span className="px-2.5 py-1 bg-teal-50 text-brand-blue font-extrabold text-[10px] rounded uppercase border border-teal-100">
                                                {item.tag_category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 font-bold text-gray-900 line-clamp-1">
                                            {item.title}
                                        </td>
                                        <td className="py-4 px-6 text-xs text-gray-500">
                                            {item.author?.name || "Admin BPAK"}
                                        </td>
                                        <td className="py-4 px-6 text-xs font-semibold">
                                            {item.published_at
                                                ? new Date(
                                                      item.published_at,
                                                  ).toLocaleDateString(
                                                      "id-ID",
                                                      {
                                                          year: "numeric",
                                                          month: "short",
                                                          day: "numeric",
                                                      },
                                                  )
                                                : "-"}
                                        </td>
                                        <td className="py-4 px-6 text-right space-x-1.5">
                                            <button
                                                onClick={() =>
                                                    openEditModal(item)
                                                }
                                                title="Edit Pengumuman"
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
                                                    handleDelete(item.id)
                                                }
                                                title="Hapus Pengumuman"
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
                                        Belum ada pengumuman dipublikasikan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Form */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                <form
                    onSubmit={handleSubmit}
                    className="p-6"
                    encType="multipart/form-data"
                >
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                        {editingAnnouncement
                            ? "Edit Pengumuman"
                            : "Buat Pengumuman Baru"}
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 tracking-wider mb-1">
                                Judul Pengumuman (Bahasa Indonesia)
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                placeholder="Judul berita/pengumuman..."
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue font-semibold"
                                required
                            />
                            {errors.title && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 tracking-wider mb-1">
                                Judul Pengumuman (English - Opsional)
                            </label>
                            <input
                                type="text"
                                value={data.title_en}
                                onChange={(e) =>
                                    setData("title_en", e.target.value)
                                }
                                placeholder="Biarkan kosong untuk terjemahkan otomatis"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue font-semibold"
                            />
                            {errors.title_en && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.title_en}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 tracking-wider mb-1">
                                    Tag Kategori
                                </label>
                                <CustomSelect
                                    value={data.tag_category}
                                    onChange={(val) =>
                                        setData("tag_category", val)
                                    }
                                    options={[
                                        "Kurikulum",
                                        "MBKM",
                                        "RPL",
                                        "Umum",
                                    ]}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 tracking-wider mb-1">
                                    Tanggal Publikasi
                                </label>
                                <CustomDatePicker
                                    value={data.published_at}
                                    onChange={(val) =>
                                        setData("published_at", val)
                                    }
                                    placeholder="Pilih tanggal publikasi..."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 tracking-wider mb-1">
                                Ringkasan Singkat (Excerpt)
                            </label>
                            <input
                                type="text"
                                value={data.excerpt}
                                onChange={(e) =>
                                    setData("excerpt", e.target.value)
                                }
                                placeholder="Ringkasan singkat untuk tampilan kartu..."
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 tracking-wider mb-1">
                                Gambar Sampul Berita (Max 2MB)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData("image", e.target.files[0])
                                }
                                className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-50 file:text-brand-blue hover:file:bg-teal-100"
                            />
                            {errors.image && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.image}
                                </p>
                            )}
                        </div>

                        {/* Rich Content Area (Quill.js Editor) */}
                        <div>
                            <label className="block text-xs font-bold text-gray-700 tracking-wider mb-1.5">
                                Isi Konten Artikel
                            </label>
                            <QuillEditor
                                value={data.content}
                                onChange={(contentHtml) =>
                                    setData("content", contentHtml)
                                }
                                placeholder="Tuliskan isi artikel/pengumuman secara lengkap dengan format gaya teks..."
                                minHeight="220px"
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
                            {processing ? "Menyimpan..." : "Publikasikan"}
                        </button>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
