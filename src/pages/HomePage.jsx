import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/network-data';
import NoteSearch from '../components/NoteSearch';
import NotesList from '../components/NotesList';
import AddButton from '../components/AddButton';

import Swal from 'sweetalert2';


function HomePage(){
    const [notes, setNotes] = React.useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';

    useEffect(() => {
        getActiveNotes().then(({ data }) => {
            setNotes(data);
            setIsLoading(false);
        });
    }, []);

    const onSearchHandler = (newKeyword) => {
        setSearchParams({keyword: newKeyword});
    };

    const onDeleteHandler = (id) => {
        Swal.fire({
            title: "Apakah Anda Yakin?",
            text: "Anda tidak akan mendapatkan catatan ini kembali!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff5f52',
            cancelButtonColor: '#202124',
            confirmButtonText: 'Yes, delete it!' 
        }).then((result) => {
            if(result.isConfirmed){
                deleteNote(id);
                setNotes(getActiveNotes());

                Swal.fire(
                    'Deleted!',
                    'Catatan anda sudah terhapus',
                    'success'
                );
            }
        });
        
    };

    const onArchiveHandler = (id) => {
        archiveNote(id);
        setNotes(getActiveNotes());
    };

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(keyword.toLowerCase())
    );

    return(
        <section className='homepage note-app__body'>
            <h2 className='note-active-header'>Catatan Aktif</h2>
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