import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import i18n from './i18n/config'
import './index.css'
import { store } from './redux/store'
import { router } from './routes/router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </Provider>
  </StrictMode>,
)
