import { useTranslation } from 'react-i18next'
import { BrasilFlag, EuaFlag } from '@/assets'
import { Flag } from './flag'

export const I18n = () => {
  const { i18n } = useTranslation()

  function handleChangeLanguage(language: string | undefined) {
    i18n.changeLanguage(language)
  }

  const selectedLanguage = i18n.language

  return (
    <div className='flex items-center gap-2'>
      <Flag
        image={BrasilFlag}
        isSelected={selectedLanguage === 'pt-BR'}
        onClick={() => handleChangeLanguage('pt-BR')}
      />
      <Flag
        image={EuaFlag}
        isSelected={selectedLanguage === 'en-US'}
        onClick={() => handleChangeLanguage('en-US')}
      />
    </div>
  )
}