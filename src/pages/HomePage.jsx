import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/network-data';
import { ThemeContext } from '../contexts/ThemeContext';
import { LocaleContext } from '../contexts/LocaleContext';

import NoteSearch from '../components/NoteSearch';
import NotesList from '../components/NotesList';
import AddButton from '../components/AddButton';

import Swal from 'sweetalert2';


function HomePage(){
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';

    const { theme, toggleTheme } = useContext(ThemeContext);
    const { locale, toggleLocale } = useContext(LocaleContext);
    

    useEffect(() => {
        getActiveNotes().then(({ data }) => {
            setNotes(data || []);
            setIsLoading(false);
        });
    }, []);

    const onSearchHandler = (newKeyword) => {
        setSearchParams({keyword: newKeyword});
    };

    const onDeleteHandler = async (id) => {
        const result = await Swal.fire({
            title: "Apakah Anda Yakin?",
            text: "Anda tidak akan mendapatkan catatan ini kembali!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff5f52',
            cancelButtonColor: '#202124',
            confirmButtonText: 'Yes, delete it!' 
        });


        if(result.isConfirmed){
            await deleteNote(id);
            const { data } = await getActiveNotes();
            setNotes(data || []);

            Swal.fire(
                'Deleted!',
                'Catatan anda sudah terhapus',
                'success'
            );
        }
    }

    const onArchiveHandler = async (id) => {
        await archiveNote(id);
        const { data } = await getActiveNotes();
        setNotes(data || []);
    };

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(keyword.toLowerCase())
    );

    if(isLoading){
        return <p>Memuat catatan...</p>
    }

    return(
        <section className='homepage note-app__body'>
            <h2 className='note-active-header'>
                {locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}
            </h2>
            <NoteSearch 
                keyword={keyword} 
                onSearch={onSearchHandler} 
            />

            <NotesList 
                notes={filteredNotes}
                onDelete={onDeleteHandler}
                onArchive={onArchiveHandler}
                searchKeyword={keyword}
            />

            <AddButton />
        </section>
    )
}

export default HomePage;