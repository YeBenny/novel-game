import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../redux/reducer/counterSlice'
import styles from './Counter.module.css'
import { useTranslation } from 'react-i18next'

export default function Counter() {
  // We can read data from the store with useSelector hook
  const count = useSelector((state) => state.counter.value)
  // and dispatch actions using useDispatch hook
  const dispatch = useDispatch()
  // Deploy translation that related to `counter.json` in locales
  const { t } = useTranslation('counter/counter')

  return (
    <>
      <div>
        <button onClick={() => dispatch(decrement())}>
          -
        </button>
        <span className={styles.value}>
          {t('value') + count}
        </span>
        <button onClick={() => dispatch(increment())}>
          +
        </button>
      </div>
    </>
  )
}
