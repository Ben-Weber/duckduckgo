import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../src/locale/en/translation.json';
import he from '../src/locale/he/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      he: {
        translation: he,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

