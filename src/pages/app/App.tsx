import reactLogo from '/assets/react.svg'
import viteLogo from '/assets/vite.svg'
import reduxLogo from '/assets/redux.svg'
import './App.css'
import { useTranslation, Trans } from 'react-i18next'
import Counter from '../../components/counter/Counter'

// Define a language switcher, matching with the resources in `src/i18n/i18n.ts`,
// or the file `public/locales`, keeping the file structure untouched.
// The manually selected language is persisted in the localStorage, in the field of `i18nextLng`
const lngs = {
  zhCN: {nativeName: '简体中文'},
  en: {nativeName: 'English'},
  de: {nativeName: 'Deutsch'}
}

function App() {
  const { t, i18n } = useTranslation()

  return (
    <>
      <div className="App-header">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://redux.js.org/" target="_blank">
          <img src={reduxLogo} className="logo" alt="Redux logo" />
        </a>
        <h2>Vite + React + Redux</h2>
        <div>
          {Object.keys(lngs).map((lng) => (
            // `i18n.resolvedLanguage` is set to the current resolved language
            <button 
              key={lng} 
              style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} 
              type="submit" 
              onClick={() => i18n.changeLanguage(lng)}
            >
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
      </div>
      <div className="card">
        <Counter></Counter>
      </div>
    </>
  )
}

export default App
