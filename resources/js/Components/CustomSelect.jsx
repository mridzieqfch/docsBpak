import React from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";

export default function CustomSelect({
    value,
    onChange,
    options = [],
    placeholder = "Pilih opsi...",
    className = "",
    disabled = false,
}) {
    // Format options to unified { value, label } structure
    const formattedOptions = options.map((opt) => {
        if (typeof opt === "object" && opt !== null) {
            return {
                value: opt.value !== undefined ? opt.value : opt.id,
                label: opt.label !== undefined ? opt.label : (opt.name || opt.title || String(opt.id)),
            };
        }
        return { value: opt, label: opt };
    });

    const selectedOption = formattedOptions.find(
        (opt) => String(opt.value) === String(value)
    );

    return (
        <div className={`relative ${className}`}>
            <Listbox value={value} onChange={onChange} disabled={disabled}>
                <div className="relative">
                    <ListboxButton className="relative w-full cursor-pointer rounded-xl bg-white py-2.5 pl-4 pr-10 text-left text-sm font-medium text-gray-900 border border-gray-300 shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue disabled:bg-gray-100 disabled:cursor-not-allowed transition-all">
                        <span className="block truncate">
                            {selectedOption ? (
                                <span className="font-bold text-gray-900">{selectedOption.label}</span>
                            ) : (
                                <span className="text-gray-400 font-normal">{placeholder}</span>
                            )}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg
                                className="h-4 w-4 text-gray-400"
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
                        </span>
                    </ListboxButton>

                    <ListboxOptions className="absolute z-50 mt-1.5 max-h-60 w-full overflow-auto rounded-xl bg-white py-1.5 text-sm shadow-xl ring-1 ring-black/5 focus:outline-none border border-gray-100 transition-all">
                        {formattedOptions.map((option, idx) => {
                            const isSelected = String(option.value) === String(value);
                            return (
                                <ListboxOption
                                    key={idx}
                                    value={option.value}
                                    className={({ focus }) =>
                                        `relative cursor-pointer select-none py-2.5 pl-4 pr-10 transition-colors ${
                                            focus
                                                ? "bg-teal-50 text-brand-blue font-bold"
                                                : isSelected
                                                ? "bg-teal-50/60 text-brand-blue font-bold"
                                                : "text-gray-800"
                                        }`
                                    }
                                >
                                    <span
                                        className={`block truncate ${
                                            isSelected ? "font-bold text-brand-blue" : "font-medium"
                                        }`}
                                    >
                                        {option.label}
                                    </span>

                                    {isSelected && (
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-brand-blue">
                                            <svg
                                                className="h-4 w-4"
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
                                        </span>
                                    )}
                                </ListboxOption>
                            );
                        })}
                    </ListboxOptions>
                </div>
            </Listbox>
        </div>
    );
}
