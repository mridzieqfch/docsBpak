import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const defaultModules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["link", "image"],
        ["clean"],
    ],
};

const defaultFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "align",
    "color",
    "background",
    "link",
    "image",
];

export default function QuillEditor({
    value,
    onChange,
    placeholder = "Tuliskan isi konten di sini...",
    className = "",
    minHeight = "200px",
}) {
    return (
        <div className={`quill-editor-wrapper bg-white rounded-xl border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-brand-blue ${className}`}>
            <style>{`
                .quill-editor-wrapper .ql-toolbar.ql-snow {
                    border: none;
                    border-bottom: 1px solid #e5e7eb;
                    background-color: #f9fafb;
                    border-top-left-radius: 0.75rem;
                    border-top-right-radius: 0.75rem;
                    padding: 8px 12px;
                }
                .quill-editor-wrapper .ql-container.ql-snow {
                    border: none;
                    font-family: inherit;
                    font-size: 0.875rem;
                }
                .quill-editor-wrapper .ql-editor {
                    min-height: ${minHeight};
                    padding: 12px 16px;
                }
                .quill-editor-wrapper .ql-editor.ql-blank::before {
                    color: #9ca3af;
                    font-style: normal;
                    left: 16px;
                }
            `}</style>
            <ReactQuill
                theme="snow"
                value={value || ""}
                onChange={onChange}
                modules={defaultModules}
                formats={defaultFormats}
                placeholder={placeholder}
            />
        </div>
    );
}
