import en from "./assets/locales/en.json";
import zh from "./assets/locales/zh.json";
import * as i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";

const resources = {
  en: { translation: en },
  zh: { translation: zh },
};

i18n.use(initReactI18next).init({
  resources,
  lng: getLocales()[0].languageCode || "en", // initial language
  fallbackLng: "en", // fallback language if the current language is not available
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  supportedLngs: ["en", "zh"], // supported languages
});

export default i18n;
