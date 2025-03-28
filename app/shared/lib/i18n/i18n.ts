import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { de } from './locales/de';
import { en } from './locales/en';
import { pt } from './locales/pt';

export const defaultNS = 'translations';
export const resources = {
  pt,
  en,
  de,
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    defaultNS,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });
