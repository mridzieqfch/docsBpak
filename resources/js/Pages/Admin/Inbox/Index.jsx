import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal";

export default function InboxIndex({ messages }) {
    const [selectedMessage, setSelectedMessage] = useState(null);

    const openDetailModal = (msg) => {
        setSelectedMessage(msg);
        if (!msg.is_read) {
            router.patch(
                route("admin.inbox.mark-read", msg.id),
                {},
                { preserveScroll: true },
            );
        }
    };

    const closeModal = () => {
        setSelectedMessage(null);
    };

    const handleMarkAsRead = (id, e) => {
        e.stopPropagation();
        router.patch(
            route("admin.inbox.mark-read", id),
            {},
            { preserveScroll: true },
        );
    };

    const handleDelete = (id, e) => {
        e.stopPropagation();
        if (confirm("Apakah Anda yakin ingin menghapus pesan ini?")) {
            router.delete(route("admin.inbox.destroy", id));
        }
    };

    return (
        <AdminLayout header="Inbox Pesan Pengunjung">
            <Head title="Inbox Pesan" />

            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">
                        Pesan Masuk Contact Form
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                        Pesan dan pertanyaan pengajuan dari
                        mahasiswa/dosen/publik
                    </p>
                </div>

                <div className="divide-y divide-gray-100">
                    {messages && messages.length > 0 ? (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                onClick={() => openDetailModal(msg)}
                                className={`p-6 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                                    !msg.is_read
                                        ? "bg-yellow-50/70 hover:bg-yellow-100/60 border-l-4 border-yellow-500 font-bold"
                                        : "bg-white hover:bg-teal-50/20 font-normal"
                                }`}
                            >
                                <div className="space-y-1.5 flex-1 min-w-0">
                                    <div className="flex items-center gap-3">
                                        {!msg.is_read ? (
                                            <span className="px-2.5 py-0.5 bg-yellow-400 text-yellow-950 font-extrabold text-[10px] rounded-full uppercase tracking-wider shrink-0">
                                                Pesan Baru
                                            </span>
                                        ) : (
                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 font-bold text-[10px] rounded uppercase shrink-0">
                                                Dibaca
                                            </span>
                                        )}
                                        <h4
                                            className={`text-base truncate ${!msg.is_read ? "font-extrabold text-gray-900" : "font-semibold text-gray-800"}`}
                                        >
                                            {msg.sender_name}{" "}
                                            <span className="text-xs text-gray-500 font-mono">
                                                ({msg.sender_id_number})
                                            </span>
                                        </h4>
                                    </div>

                                    <p className="text-xs font-bold text-brand-blue">
                                        {msg.question_category}
                                    </p>
                                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-medium">
                                        {msg.message_body}
                                    </p>
                                    <span className="text-[10px] text-gray-400 block font-medium">
                                        Waktu:{" "}
                                        {new Date(
                                            msg.created_at,
                                        ).toLocaleString("id-ID")}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                    {!msg.is_read && (
                                        <button
                                            onClick={(e) =>
                                                handleMarkAsRead(msg.id, e)
                                            }
                                            title="Tandai Sudah Dibaca"
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
                                                    strokeWidth="2.5"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                    <button
                                        onClick={(e) => handleDelete(msg.id, e)}
                                        title="Hapus Pesan"
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
                        <div className="p-8 text-center text-gray-500 text-sm font-medium">
                            Belum ada pesan masuk di inbox.
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Detail View */}
            <Modal show={!!selectedMessage} onClose={closeModal} maxWidth="lg">
                {selectedMessage && (
                    <div className="p-6">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                            <div>
                                <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider">
                                    {selectedMessage.question_category}
                                </span>
                                <h3 className="text-lg font-bold text-gray-900">
                                    {selectedMessage.sender_name}
                                </h3>
                                <p className="text-xs text-gray-500 font-mono">
                                    Identitas/NIM:{" "}
                                    {selectedMessage.sender_id_number}
                                </p>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">
                                {new Date(
                                    selectedMessage.created_at,
                                ).toLocaleString("id-ID")}
                            </span>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-800 font-medium leading-relaxed mb-6 whitespace-pre-wrap">
                            {selectedMessage.message_body}
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </AdminLayout>
    );
}
