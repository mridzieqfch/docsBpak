import React, { useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

const MONTH_NAMES = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
];

const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export default function CustomDatePicker({
    value,
    onChange,
    placeholder = "Pilih tanggal...",
    className = "",
    disabled = false,
}) {
    // Parse value string (YYYY-MM-DD) into Date or null
    const parseDate = (valStr) => {
        if (!valStr) return null;
        const [year, month, day] = valStr.split("-").map(Number);
        if (year && month && day) {
            return new Date(year, month - 1, day);
        }
        return null;
    };

    const selectedDate = parseDate(value);
    const initialViewDate = selectedDate || new Date();

    const [currentYear, setCurrentYear] = useState(initialViewDate.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(initialViewDate.getMonth());

    const formatDateForDisplay = (dateObj) => {
        if (!dateObj) return "";
        const day = String(dateObj.getDate()).padStart(2, "0");
        const monthName = MONTH_NAMES[dateObj.getMonth()];
        const year = dateObj.getFullYear();
        return `${day} ${monthName} ${year}`;
    };

    const formatDateForValue = (dateObj) => {
        if (!dateObj) return "";
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    // Calculate matrix of days for current month view
    const getCalendarDays = () => {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

        const days = [];

        // Previous month padding days
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            const date = new Date(currentYear, currentMonth - 1, daysInPrevMonth - i);
            days.push({ date, isCurrentMonth: false });
        }

        // Current month days
        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(currentYear, currentMonth, d);
            days.push({ date, isCurrentMonth: true });
        }

        // Next month padding days to fill 35 or 42 grid cells
        const remainingCells = (7 - (days.length % 7)) % 7;
        for (let i = 1; i <= remainingCells; i++) {
            const date = new Date(currentYear, currentMonth + 1, i);
            days.push({ date, isCurrentMonth: false });
        }

        return days;
    };

    const today = new Date();
    const isToday = (dateObj) =>
        dateObj.getFullYear() === today.getFullYear() &&
        dateObj.getMonth() === today.getMonth() &&
        dateObj.getDate() === today.getDate();

    const isSelected = (dateObj) =>
        selectedDate &&
        dateObj.getFullYear() === selectedDate.getFullYear() &&
        dateObj.getMonth() === selectedDate.getMonth() &&
        dateObj.getDate() === selectedDate.getDate();

    return (
        <div className={`relative ${className}`}>
            <Popover className="relative">
                {({ close }) => (
                    <>
                        <PopoverButton
                            disabled={disabled}
                            className="relative w-full cursor-pointer rounded-xl bg-white py-2.5 pl-4 pr-10 text-left text-sm font-bold text-gray-900 border border-gray-300 shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue disabled:bg-gray-100 disabled:cursor-not-allowed transition-all flex items-center justify-between"
                        >
                            <span>
                                {selectedDate ? (
                                    formatDateForDisplay(selectedDate)
                                ) : (
                                    <span className="text-gray-400 font-normal">{placeholder}</span>
                                )}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-brand-blue">
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
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </span>
                        </PopoverButton>

                        <PopoverPanel className="absolute z-50 mt-1.5 w-72 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5 border border-gray-100 transition-all">
                            {/* Calendar Header: Month/Year & Nav */}
                            <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                                <button
                                    type="button"
                                    onClick={handlePrevMonth}
                                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <div className="text-xs font-extrabold text-gray-900 tracking-wide">
                                    {MONTH_NAMES[currentMonth]} {currentYear}
                                </div>
                                <button
                                    type="button"
                                    onClick={handleNextMonth}
                                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Day of Week Headers */}
                            <div className="grid grid-cols-7 text-center mb-1">
                                {DAY_NAMES.map((dayName, idx) => (
                                    <span
                                        key={idx}
                                        className="text-[11px] font-extrabold uppercase text-gray-400 py-1"
                                    >
                                        {dayName}
                                    </span>
                                ))}
                            </div>

                            {/* Days Grid */}
                            <div className="grid grid-cols-7 gap-1 text-center">
                                {getCalendarDays().map(({ date, isCurrentMonth }, idx) => {
                                    const selected = isSelected(date);
                                    const todayDate = isToday(date);

                                    return (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => {
                                                onChange(formatDateForValue(date));
                                                close();
                                            }}
                                            className={`h-8 w-8 mx-auto rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                                                selected
                                                    ? "bg-brand-blue text-white shadow-xs scale-105"
                                                    : todayDate
                                                    ? "bg-teal-50 text-brand-blue ring-1 ring-brand-blue"
                                                    : isCurrentMonth
                                                    ? "text-gray-800 hover:bg-teal-50 hover:text-brand-blue"
                                                    : "text-gray-300 hover:bg-gray-50"
                                            }`}
                                        >
                                            {date.getDate()}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Quick Actions Footer */}
                            <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const now = new Date();
                                        setCurrentMonth(now.getMonth());
                                        setCurrentYear(now.getFullYear());
                                        onChange(formatDateForValue(now));
                                        close();
                                    }}
                                    className="font-bold text-brand-blue hover:text-brand-dark transition-colors px-2 py-1 rounded-md hover:bg-teal-50"
                                >
                                    Hari Ini
                                </button>
                                {value ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onChange("");
                                            close();
                                        }}
                                        className="font-bold text-red-500 hover:text-red-700 transition-colors px-2 py-1 rounded-md hover:bg-red-50"
                                    >
                                        Hapus
                                    </button>
                                ) : null}
                            </div>
                        </PopoverPanel>
                    </>
                )}
            </Popover>
            </div>
        );
    }
