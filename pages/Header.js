import React, { useEffect, useState, useContext,  } from 'react';
import Link from 'next/link';
import './headerStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from '../src/app/AuthContext';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  const [darkTheme, setDarkTheme] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const isLoggedIn = user !== null;

  const handleToggle = () => {
    setDarkTheme(!darkTheme);
  };

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDarkTheme(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setDarkTheme(false);
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      window.localStorage.setItem('theme', 'light');
    }
  }, [darkTheme]);

  return (
    <header>
      <Link href="/">
        <div className="logo">
          <img src="/logo-no-background.png" alt="Logo" />
        </div>
      </Link>
      <nav>
        <ul>
          <li>
            <div className="toggle-container">
              <FontAwesomeIcon
                icon={darkTheme ? faMoon : faSun}
                className={`toggle-icon ${darkTheme ? 'moon' : 'sun'}`}
                onClick={handleToggle}
              />
            </div>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <button className='logout-button' onClick={() => {
                  router.push('/dashboard');
                }}>Хянах самбар</button>
              </li>
              <li>
                <button className='logout-button' onClick={() => logout()}>Гарах</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Нэвтрэх</Link>
              </li>
              <li>
                <Link href="/register">Бүртгүүлэх</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
