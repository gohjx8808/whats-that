import en from "./assets/locales/en.json";
import zhCN from "./assets/locales/zh-CN.json";
import * as i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";

interface language {
  value: string;
  label: string;
}

export const SUPPORTED_LANGUAGES: language[] = [
  { value: "en", label: "🇬🇧 English" },
  { value: "zh-CN", label: "🇨🇳 中文" },
];

const resources = {
  en: { translation: en },
  "zh-CN": { translation: zhCN },
};

i18n.use(initReactI18next).init({
  resources,
  lng: getLocales()[0].languageCode || "en", // initial language
  fallbackLng: "en", // fallback language if the current language is not available
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  supportedLngs: ["en", "zh-CN"], // supported languages
});

export default i18n;
