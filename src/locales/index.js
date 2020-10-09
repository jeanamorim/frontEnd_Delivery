import I18n from 'i18n-js';
import { ptBR as pt_BR } from 'date-fns/locale';

// suported languages

import pt from './pt-BR';

I18n.translations = {
  pt_BR: 'pt-BR',
};

// your language
export const locale = (navigator.language || navigator.userLanguage).replace(
  '-',
  '_',
);

const dateLanguages = { pt_BR };

// date-fns language based in your locale
export const dateLanguage = dateLanguages[locale];

I18n.locale = locale;

export default function translate(key) {
  return I18n.t(key);
}
