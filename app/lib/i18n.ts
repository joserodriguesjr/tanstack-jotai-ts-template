import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { useTranslation } from "react-i18next"

import ptBr from '@/assets/locales/pt-br.json'
import enUs from '@/assets/locales/en-us.json'

const translations = {
  'pt-BR': ptBr,
  'en-US': enUs
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
  resources: translations, 
  fallbackLng: 'pt-BR',
  defaultNS: 'translations'
})

export const useTranslate = () => {
    const { t, i18n } = useTranslation()

    const translator = ( { path }: {path: string} ) => {
        return t(path)
    }

    const onChangeLanguage = (language: keyof typeof translations) => {
        i18n.changeLanguage(language)
    }

    return {
        language: i18n.language,
        onChangeLanguage,
        translator
    }
}

export default i18n;