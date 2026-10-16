import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Modal from '@/Components/Modal';
import CustomSelect from '@/Components/CustomSelect';

export default function DocumentsIndex({ documents, categories }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDocument, setEditingDocument] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        title_en: '',
        category_id: categories?.[0]?.id || '',
        academic_year: '2024/2025',
        file: null,
    });

    const openCreateModal = () => {
        setEditingDocument(null);
        reset();
        if (categories && categories.length > 0) {
            setData('category_id', categories[0].id);
        }
        setIsModalOpen(true);
    };

    const openEditModal = (doc) => {
        setEditingDocument(doc);
        setData({
            title: doc.title,
            title_en: doc.title_en || '',
            category_id: doc.category_id,
            academic_year: doc.academic_year,
            file: null,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingDocument(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingDocument) {
            // Use post with _method PUT for multipart form data
            router.post(route('admin.documents.update', editingDocument.id), {
                _method: 'put',
                ...data,
            }, {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.documents.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus berkas dokumen ini?')) {
            router.delete(route('admin.documents.destroy', id));
        }
    };

    return (
        <AdminLayout header="Kelola Repositori Dokumen">
            <Head title="Repositori Dokumen - BPAK ITPLN" />

            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Daftar Dokumen Repositori</h3>
                        <p className="text-xs text-gray-500 font-medium">Unggah dan kelola berkas kurikulum (PDF, DOCX max 10MB)</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center px-4 py-2.5 bg-brand-blue hover:bg-brand-dark text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                    >
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Unggah Dokumen Baru
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-[11px] font-extrabold uppercase tracking-wider text-gray-500 border-b border-gray-100">
                                <th className="py-3.5 px-6">Tipe</th>
                                <th className="py-3.5 px-6">Judul Dokumen</th>
                                <th className="py-3.5 px-6">Kategori</th>
                                <th className="py-3.5 px-6">Tahun Akademik</th>
                                <th className="py-3.5 px-6">Ukuran</th>
                                <th className="py-3.5 px-6">Unduhan</th>
                                <th className="py-3.5 px-6 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
                            {documents && documents.length > 0 ? (
                                documents.map((doc) => (
                                    <tr key={doc.id} className="hover:bg-teal-50/30 transition-colors">
                                        <td className="py-4 px-6">
                                            <span className="px-2 py-0.5 bg-red-100 text-red-700 font-extrabold text-[10px] rounded uppercase">
                                                {doc.file_type}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 font-bold text-gray-900">{doc.title}</td>
                                        <td className="py-4 px-6 text-xs text-brand-blue font-bold">
                                            {doc.category?.name || '-'}
                                        </td>
                                        <td className="py-4 px-6 text-xs font-semibold">{doc.academic_year}</td>
                                        <td className="py-4 px-6 text-xs text-gray-500 font-mono">{doc.file_size}</td>
                                        <td className="py-4 px-6 text-xs font-bold text-teal-800">{doc.download_count}x</td>
                                        <td className="py-4 px-6 text-right space-x-1.5">
                                            <button
                                                onClick={() => openEditModal(doc)}
                                                title="Edit Dokumen"
                                                className="p-2 bg-slate-100 hover:bg-brand-blue text-slate-700 hover:text-white rounded-xl transition-all shadow-2xs inline-flex items-center justify-center"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(doc.id)}
                                                title="Hapus Dokumen"
                                                className="p-2 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white rounded-xl transition-all shadow-2xs inline-flex items-center justify-center"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-gray-500">
                                        Belum ada berkas dokumen diunggah.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Form */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="lg">
                <form onSubmit={handleSubmit} className="p-6" encType="multipart/form-data">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                        {editingDocument ? 'Edit Dokumen' : 'Unggah Dokumen Baru'}
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                Judul Dokumen (Bahasa Indonesia)
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Contoh: Kurikulum S1 Teknik Elektro 2024"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue"
                                required
                            />
                            {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                Judul Dokumen (English - Opsional)
                            </label>
                            <input
                                type="text"
                                value={data.title_en}
                                onChange={(e) => setData('title_en', e.target.value)}
                                placeholder="Biarkan kosong untuk terjemahkan otomatis"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue"
                            />
                            {errors.title_en && <p className="text-xs text-red-600 mt-1">{errors.title_en}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                Kategori Dokumen
                            </label>
                            <CustomSelect
                                value={data.category_id}
                                onChange={(val) => setData('category_id', val)}
                                options={categories || []}
                                placeholder="Pilih kategori dokumen..."
                            />
                            {errors.category_id && <p className="text-xs text-red-600 mt-1">{errors.category_id}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                Tahun Akademik
                            </label>
                            <input
                                type="text"
                                value={data.academic_year}
                                onChange={(e) => setData('academic_year', e.target.value)}
                                placeholder="Contoh: 2024/2025"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue"
                                required
                            />
                            {errors.academic_year && <p className="text-xs text-red-600 mt-1">{errors.academic_year}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                {editingDocument ? 'Ganti Berkas Dokumen (Opsional)' : 'Unggah Berkas File (PDF/DOCX Max 10MB)'}
                            </label>
                            <input
                                type="file"
                                onChange={(e) => setData('file', e.target.files[0])}
                                className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-50 file:text-brand-blue hover:file:bg-teal-100"
                                required={!editingDocument}
                            />
                            {errors.file && <p className="text-xs text-red-600 mt-1">{errors.file}</p>}
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
                            {processing ? 'Proses Unggah...' : 'Simpan Dokumen'}
                        </button>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
