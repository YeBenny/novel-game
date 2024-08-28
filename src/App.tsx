// import { useState } from 'react'
import { Suspense } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useTranslation, Trans } from 'react-i18next'

// Define a language switcher, matching with the resources in `src/i18n/i18n.ts`,
// or the file `public/locales`, keeping the file structure untouched.
// The manually selected language is persisted in the localStorage, in the field of `i18nextLng`
const lngs = {
  zhCN: {nativeName: '简体中文'},
  en: {nativeName: 'English'},
  de: {nativeName: 'Deutsch'}
}

function App() {
  // const [count, setCount] = useState(0)
  const { t, i18n } = useTranslation()

  return (
    <>
      {/* <div>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

    <div className="App">
      <header className="App-header">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <div>
          {Object.keys(lngs).map((lng) => (
            // `i18n.resolvedLanguage` is set to the current resolved language
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
        <p>
          {/* We used the Trans component for the first text */}
          <Trans i18nKey="description.part1">
            Edit <code>src/App.js</code> and save to test HMR
          </Trans>
        </p>
        <a
          className="read-the-docs"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* We used the useTranslation hook for the second text */}
          {t('description.part2')}
        </a>
      </header>
    </div>
      
    </>
  )
}

// export default App

// here app catches the suspense from page in case translations are not yet loaded
export default function WrappedApp() {
  return (
    <Suspense fallback="...is loading">
      <App />
    </Suspense>
  )
}
