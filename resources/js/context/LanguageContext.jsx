import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/lang/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('id');

    useEffect(() => {
        const savedLang = localStorage.getItem('app_lang');
        if (savedLang && (savedLang === 'id' || savedLang === 'en')) {
            setLang(savedLang);
        }
    }, []);

    const changeLanguage = (newLang) => {
        if (newLang === 'id' || newLang === 'en') {
            setLang(newLang);
            localStorage.setItem('app_lang', newLang);
        }
    };

    const t = (key, fallback = '') => {
        const currentDict = translations[lang] || translations.id;
        return currentDict[key] || fallback || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
}
