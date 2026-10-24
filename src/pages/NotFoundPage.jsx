import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage(){
    return (
        <section className='not-found-page'>
            <h2>
                404
            </h2>
            <p>
                Maaf, halaman yang Anda cari tidak ditemukan.
            </p>
            <Link to='/'>
                Kembali ke Beranda
            </Link>
        </section>
    )
}

export default NotFoundPage;