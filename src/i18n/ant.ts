import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import zhTW from 'antd/locale/zh_TW'

zhCN.DatePicker!.lang = {
  ...zhCN.DatePicker!.lang,
  monthFormat: 'M月',
  shortWeekDays: ['日', '一', '二', '三', '四', '五', '六'],
}

zhTW.DatePicker!.lang = {
  ...zhTW.DatePicker!.lang,
  monthFormat: 'M月',
  shortWeekDays: ['日', '一', '二', '三', '四', '五', '六'],
}

export const antdLang: { [key: string]: any } = {
  en: enUS,
  'en-US': enUS,
  zh: zhCN,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
}
