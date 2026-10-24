import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AddPage from './pages/AddPage';
import DetailPage from './pages/DetailPage';
import ArchivePage from './pages/ArchivePage';
import NotFoundPage from './pages/NotFoundPage';

function App(){
    return(
        <div className='app-container'>
            <Navigation />

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