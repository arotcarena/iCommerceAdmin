import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enMessages from "./locales/en/messages.json";
import frMessages from "./locales/fr/messages.json";
import { AppConfig } from "config/AppConfig";

// the translations
const resources = {
  en: {
    translation: enMessages,
  },
  fr: {
    translation: frMessages,
  }
};

const language = localStorage.getItem("I18N_LANGUAGE");
if (!language) {
  localStorage.setItem("I18N_LANGUAGE", AppConfig.DEFAULT_LOCALE);
}

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("I18N_LANGUAGE") || AppConfig.DEFAULT_LOCALE,
    fallbackLng: AppConfig.DEFAULT_LOCALE, // use this if detected lng is not available

    keySeparator: '.',

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
