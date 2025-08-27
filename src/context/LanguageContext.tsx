import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n/config';
type Language = 'es' | 'en';

interface LanguageContextValue {
    language: Language;
    toggleLanguage: () => Promise<void>;
    isReady: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
    language: 'es',
    toggleLanguage: async () => { },
    isReady: false,
});

export const useLanguageContext = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('es');
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const handleInitialized = () => {
            setLanguage(i18n.language as Language);
            setIsReady(true);
        };

        if (i18n.isInitialized) {
            handleInitialized();
        } else {
            i18n.on('initialized', handleInitialized);
        }

        return () => {
            i18n.off('initialized', handleInitialized);
        };
    }, []);

    const toggleLanguage = async () => {
        try {
            const newLanguage = language === 'es' ? 'en' : 'es';
            await i18n.changeLanguage(newLanguage);
            setLanguage(newLanguage);
        } catch (error) {
            console.error('Error changing language:', error);
        }
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, isReady }}>
            {children}
        </LanguageContext.Provider>
    );
};