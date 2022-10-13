import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import id from './id.json';
import ta from './ta.json';
import bn from './bn.json';
import mr from './mr.json';
import zh from './zh.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    es: es,
    en: en,
    fr: fr,
    id: id,
    ta: ta,
    bn: bn,
    mr: mr,
    zh: zh,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
