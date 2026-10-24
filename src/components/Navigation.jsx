import React from 'react';
import { Link } from 'react-router-dom';

function Navigation(){
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
                </ul>
            </nav>
        </header>
    );
}

export default Navigation;