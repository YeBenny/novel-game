import { Suspense } from 'react'
import { createHashRouter } from 'react-router-dom'

import AppLayoutComponent from '../components/app-layout/AppLayoutComponent'
import Loading from '../components/loading/Loading'
import App from '../pages/app/App'

// Create and render a browser router
export const router = createHashRouter([
  {
    path: '/',
    element: (
      <>
        {/* here app catches the suspense from page in case translations are not yet loaded */}
        <Suspense fallback={<Loading />}>
          <AppLayoutComponent>
            <App />
          </AppLayoutComponent>
        </Suspense>
      </>
    ),
  },
])
