import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

i18n
  // loads translations from your server asynchronously
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  // i18next.init(options, callback)
  .init({
    // logs info level to console output
    debug: true,
    // language to use if translations in user language are not available
    fallbackLng: 'en',
    interpolation: {
      // By default, the values get escaped to mitigate XSS attacks.
      // You can toggle escaping off,
      // by setting the escapeValue option to false when requesting a translation
      escapeValue: false, // not needed for react as it escapes by default
    },
    // resources: {
    //   en: {
    //     translation: {
    //       // here we will place our translation
    //     }
    //   },
    // }
  })

export default i18n
