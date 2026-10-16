import React, { useState, useRef, useEffect } from "react";
import Modal from "@/Components/Modal";

export default function ImageUploadModal({
    show = false,
    title = "Unggah Gambar",
    recommendation = "Format: JPEG, PNG, WEBP (Maksimal 5MB)",
    onClose = () => {},
    onSelectFile = () => {},
}) {
    const [isDragging, setIsDragging] = useState(false);
    const [tempFile, setTempFile] = useState(null);
    const [tempPreview, setTempPreview] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!show) {
            setTempFile(null);
            setTempPreview(null);
            setErrorMessage("");
            setIsDragging(false);
        }
    }, [show]);

    const processFile = (file) => {
        if (!file) return;

        // Validate image format
        const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        if (!validTypes.includes(file.type)) {
            setErrorMessage("Format file tidak didukung. Harap pilih gambar JPEG, PNG, atau WEBP.");
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            setErrorMessage("Ukuran file terlalu besar. Maksimal ukuran file adalah 5MB.");
            return;
        }

        setErrorMessage("");
        setTempFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setTempPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileInputChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            processFile(e.target.files[0]);
        }
    };

    const handleConfirm = () => {
        if (tempFile) {
            onSelectFile(tempFile);
            onClose();
        }
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="lg">
            <div className="p-6 sm:p-7">
                {/* Modal Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                    <div>
                        <h3 className="text-lg font-extrabold text-slate-900">
                            Pilih / Unggah Gambar
                        </h3>
                        <p className="text-xs font-semibold text-teal-700 mt-0.5">
                            {title}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Recommendation hint */}
                <div className="mb-4 bg-teal-50/70 border border-teal-100 p-3 rounded-xl flex items-center gap-2 text-xs font-semibold text-teal-800">
                    <svg className="w-4 h-4 text-teal-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{recommendation}</span>
                </div>

                {/* Drag and Drop Zone / File Preview */}
                {!tempPreview ? (
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
                            isDragging
                                ? "border-brand-blue bg-teal-50/60 scale-[1.01]"
                                : "border-slate-300 hover:border-brand-blue hover:bg-slate-50/80"
                        }`}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                            onChange={handleFileInputChange}
                            className="hidden"
                        />

                        <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-teal-50 text-brand-blue flex items-center justify-center shadow-xs">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>

                        <h4 className="text-sm font-extrabold text-slate-800 mb-1">
                            Tarik & Lepas Gambar di Sini
                        </h4>
                        <p className="text-xs text-slate-500 mb-4 font-medium">
                            atau klik area ini untuk memilih file gambar dari perangkat Anda
                        </p>

                        <button
                            type="button"
                            className="px-5 py-2.5 bg-brand-blue hover:bg-brand-dark text-white rounded-xl font-bold text-xs shadow-xs transition-all pointer-events-none"
                        >
                            Pilih File dari Komputer
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 h-60 flex items-center justify-center group">
                            <img
                                src={tempPreview}
                                alt="Selected preview"
                                className="w-full h-full object-contain"
                            />
                            <div className="absolute top-3 right-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setTempFile(null);
                                        setTempPreview(null);
                                    }}
                                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-md transition-colors flex items-center gap-1"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Ganti Pilihan
                                </button>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
                            <div className="flex items-center gap-2 truncate pr-2">
                                <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="truncate">{tempFile?.name}</span>
                            </div>
                            <span className="text-slate-500 shrink-0 font-bold">
                                {formatFileSize(tempFile?.size)}
                            </span>
                        </div>
                    </div>
                )}

                {/* Error message */}
                {errorMessage && (
                    <p className="mt-3 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 p-2.5 rounded-xl">
                        {errorMessage}
                    </p>
                )}

                {/* Modal Footer Actions */}
                <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        disabled={!tempFile}
                        onClick={handleConfirm}
                        className="px-6 py-2.5 bg-brand-blue hover:bg-brand-dark text-white rounded-xl font-extrabold text-xs shadow-md transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                        Gunakan Foto Ini
                    </button>
                </div>
            </div>
        </Modal>
    );
}
