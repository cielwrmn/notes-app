import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ name, logout }){
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
                    Notes App
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
                            Home
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
                            Archives
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={logout}
                            style={{
                                background: 'transparent',
                                border: '1px solid #fff',
                                color: 'inherit',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                            title="Klik untuk keluar"
                        >
                            {name} <span style={{
                                fontSize: '14px',
                                opacity: 0.8
                            }}>(Keluar)</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navigation;