import i18n from 'i18next'
import LngDetector from 'i18next-browser-languagedetector'
import LocalStorageBackend from 'i18next-localstorage-backend'

import enUS from './locales/en-US.json'
import zhCN from './locales/zh-CN.json'
import zhTW from './locales/zh-TW.json'

i18n.use(LngDetector).init({
  // fallbackLng: "en", // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    en: {
      translation: enUS,
    },
    'en-US': {
      translation: enUS,
    },
    zh: {
      translation: zhCN,
    },
    'zh-CN': {
      translation: zhCN,
    },
    'zh-TW': {
      translation: zhTW,
    },
  },
  fallbackLng: 'en-US',
  backend: {
    backends: [LocalStorageBackend],
    backendOptions: [
      {
        expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
      },
    ],
  },
  // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
  // set returnNull to false (and also in the i18next.d.ts options)
  // returnNull: false,
})

export default i18n
