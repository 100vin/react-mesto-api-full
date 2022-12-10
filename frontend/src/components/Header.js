import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ isLoggedIn, email, onSignOut }) {
  const location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <nav className="header__nav">
        {
          isLoggedIn 
          ? (
            <>
              <span className="header__email">{email}</span>
              <button className="header__button" onClick={onSignOut}>Выйти</button>
            </>
            ) 
          : location.pathname.includes('sign-in') 
            ? <Link className="header__link" to="/sign-up">Регистрация</Link>
            : <Link className="header__link" to="/sign-in">Войти</Link>
        }
      </nav>
    </header>
  )
}

export default Header;