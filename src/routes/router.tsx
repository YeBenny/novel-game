import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import AppLayoutComponent from '../components/app-layout/AppLayoutComponent'
// import pages and components
import App from '../pages/app/App'

// Create and render a browser router
export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        {/* here app catches the suspense from page in case translations are not yet loaded */}
        <Suspense fallback="...is loading">
          <AppLayoutComponent>
            <App />
          </AppLayoutComponent>
        </Suspense>
      </>
    ),
  },
])
