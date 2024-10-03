import { createBrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'

// import pages and components
import Header from '../components/header/Header'
import App from '../pages/app/App'

// Create and render a browser router
export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        {/* here app catches the suspense from page in case translations are not yet loaded */}
        <Suspense fallback="...is loading">
          <Header />
          <App />
        </Suspense>
      </>
    ),
  },
])
