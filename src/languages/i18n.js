import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import bn from './bn.json';
import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import id from './id.json';
import it from './it.json';
import neNP from './ne-NP.json';
import ptBR from './pt-BR.json';
import ta from './ta.json';
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
    it: it,
    ta: ta,
    bn: bn,
    zh: zh,
    ptBR: ptBR,
    neNP: neNP,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
