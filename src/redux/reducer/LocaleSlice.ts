import { createSlice } from '@reduxjs/toolkit'

import i18n from '../../i18n/config'

export const LocaleSlice = createSlice({
  name: 'locale',
  initialState: {
    locale: i18n.language,
  },
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload.locale
    },
  },
})

export const { setLocale } = LocaleSlice.actions

export default LocaleSlice.reducer
