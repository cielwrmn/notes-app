import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getNote } from '../utils/network-data';
import { showFormattedDate } from '../utils/index';
import NotFoundPage from './NotFoundPage';

function DetailPage(){
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getNote(id).then(({ data }) => {
            setNote(data || []);
            setIsLoading(false);
        });
    }, [id]);

    if(isLoading){
        return <p>Memuat detail catatan...</p>
    }

    if (!note){
        return <NotFoundPage />;
    }

    return(
        <section className='detail-page' data-testid='detail-page'>
            <h2 className='detail-page__title'>{note.title}</h2>
            <p className='detail-page__createdAt'>
                {showFormattedDate(note.createdAt)}
            </p>
            <div className='detail-page__body'>
                {note.body}
            </div>
        </section>
    )
    
}

export default DetailPage;