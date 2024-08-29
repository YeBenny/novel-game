import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './redux/store'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n/i18n'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </Provider>
  </StrictMode>,
)
