import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUserLogged, putAccessToken } from './utils/network-data';

import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AddPage from './pages/AddPage';
import DetailPage from './pages/DetailPage';
import ArchivePage from './pages/ArchivePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App(){
    const [authedUser, setAuthedUser] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoggedUser = async () => {
            const { data } = await getUserLogged();
            setAuthedUser(data);
            setInitializing(false);
        };

        fetchLoggedUser();
    }, []);

    const onLoginSuccess = async () => {
        const { data } = await getUserLogged();
        setAuthedUser(data);
        navigate('/');
    };

    const onLogout = () => {
        setAuthedUser(null);
        putAccessToken('');
        navigate('/login');
    }

    if(initializing){
        return null;
    }

    if(authedUser === null){
        return(
            <div className='app-container'>
                <header>
                    <h1>Aplikasi Catatan</h1>
                </header>
                <main>
                    <Routes>
                        <Route path='/*' element={<LoginPage loginSuccess={onLoginSuccess} />}></Route>
                        <Route path='/register' element={<RegisterPage />} />
                    </Routes>
                </main>
            </div>
        )
    }

    return(
        <div className='app-container'>
            <header>
                <Navigation />
            </header>

            <main>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/archives' element={<ArchivePage />} />
                    <Route path='/notes/new' element={<AddPage />} />
                    <Route path='/notes/:id' element={<DetailPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </main>
        </div>
    )
}

export default App;