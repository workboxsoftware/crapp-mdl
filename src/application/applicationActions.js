import { SWITCH_LOCALE } from './applicationActionTypes'
import * as i18n from '../i18n'

export function switchLocale(locale) {
  const language = locale.substr(0, 2);
  const messages = i18n[language];
  localStorage.setItem("locale", locale);
  return {
    type: SWITCH_LOCALE,
    locale,
    messages
  }
}

