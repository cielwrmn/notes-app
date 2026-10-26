import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/network-data';
import NoteSearch from '../components/NoteSearch';
import NotesList from '../components/NotesList';
import Swal from 'sweetalert2';

function ArchivePage(){
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';

    useEffect(() => {
        getArchivedNotes().then(({ data }) => {
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
            const { data } = await getArchivedNotes();
            setNotes(data || []);

            Swal.fire(
                'Deleted!',
                'Catatan anda sudah terhapus',
                'success'
            );
        }    
    };

    const onUnarchiveHandler = async (id) => {
        await unarchiveNote(id);
        const { data } = await getArchivedNotes();
        setNotes(data || []);
    };

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(keyword.toLowerCase())
    );

    if(isLoading){
        return <p>Memuat catatan arsip...</p>
    }

    return(
        <section className='archive-page'>
            <h2>Catatan Arsip</h2>
            <NoteSearch 
                keyword={keyword} 
                onSearch={onSearchHandler} 
            />

            <NotesList 
                notes={filteredNotes}
                onDelete={onDeleteHandler}
                onArchive={onUnarchiveHandler}
                searchKeyword={keyword}
            />
        </section>
    )
}

export default ArchivePage;