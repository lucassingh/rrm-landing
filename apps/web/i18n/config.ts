import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "./locales/en/common.json";
import esTranslations from "./locales/es/common.json";

// Ported verbatim from rrm-landing/src/i18n/config.ts — no language detector,
// always boots in Spanish, in-memory only (no persistence across reloads).
// That's the current app's real behavior, not an oversight to "fix" here.
export const initializeI18n = () => {
  return i18n.use(initReactI18next).init({
    resources: {
      en: { common: enTranslations },
      es: { common: esTranslations },
    },
    lng: "es",
    fallbackLng: "es",
    ns: ["common"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
};

if (!i18n.isInitialized) {
  initializeI18n().catch(console.error);
}

export default i18n;
