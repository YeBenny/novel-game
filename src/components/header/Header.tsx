import { Link } from 'react-router-dom'
import Language from '../language/Language'
import './Header.module.css'

export default function Header() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/counter">Counter</Link>
        </li>
        <li>
          <Link to="/welcome">Welcome</Link>
        </li>
      </ul>
      <Language />
    </>
  )
}
