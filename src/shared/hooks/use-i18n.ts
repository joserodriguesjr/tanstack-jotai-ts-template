import { useTranslation } from 'react-i18next';

import type { resources } from 'src/shared/lib/i18n/i18n';

export const useI18n = () => {
  const { t, i18n } = useTranslation();

  const translator = (path: string): string => {
    // @ts-expect-error i18n typescript doenst support string literal here but it works (check https://www.i18next.com/overview/typescript#type-error-template-literal)
    return t(path as const);
  };

  const onChangeLanguage = (language: keyof typeof resources) => {
    i18n.changeLanguage(language);
  };

  return {
    language: i18n.language,
    onChangeLanguage,
    translator,
  };
};
