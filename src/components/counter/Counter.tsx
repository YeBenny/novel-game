import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../redux/reducer/counterSlice'
import styles from './Counter.module.css'

export default function Counter() {
  // We can read data from the store with useSelector hook
  const count = useSelector((state) => state.counter.value)
  // and dispatch actions using useDispatch hook
  const dispatch = useDispatch()

  return (
    <>
      <div>
        <button onClick={() => dispatch(decrement())}>
          -
        </button>
        <span className={styles.value}>
          {count}
        </span>
        <button onClick={() => dispatch(increment())}>
          +
        </button>
      </div>
    </>
  )
}
