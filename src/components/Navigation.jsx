import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { LocaleContext } from '../contexts/LocaleContext';

function Navigation({ name, logout }){
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { locale, toggleLocale } = useContext(LocaleContext);

    return (
        <header className='note-app__header'>
            <h1>
                <Link 
                    to='/'
                    style={{ 
                        textDecoration: 'none',
                        color: 'inherit' 
                    }} 
                >
                    {locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}
                </Link>
            </h1>
            <nav className='navigation'>
                <ul style={{
                    display: 'flex',
                    listStyle:'none',
                    gap: '24px',
                    margin: 0,
                    padding: 0
                }}>
                    <li>
                        <Link 
                            to='/'
                            style={{ 
                                textDecoration: 'underline',
                                color: 'inherit',
                                fontSize: '18px' 
                            }}     
                        >
                            {locale === 'id' ? 'Beranda' : 'Home'}
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to='/archives'
                            style={{ 
                                textDecoration: 'underline',
                                color: 'inherit',
                                fontSize: '18px' 
                            }}     
                        >
                            {locale === 'id' ? 'Arsip' : 'Archieved'}
                        </Link>
                    </li>

                    <li>
                        <button onClick={toggleTheme} className="toggle-button">
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>
                    </li>

                    <li>
                        <button onClick={toggleLocale} className="toggle-button">
                            {locale === 'id' ? 'en' : 'id'}
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={logout}
                            title="Klik untuk keluar"
                        >
                            {name} <span>({locale === 'id' ? 'Keluar' : 'Logout'})</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navigation;