import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/local-data';
import NoteSearch from '../components/NoteSearch';
import NotesList from '../components/NotesList';

function ArchivePage(){
    const [notes, setNotes] = React.useState(getArchivedNotes());
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';

    const onSearchHandler = (newKeyword) => {
        setSearchParams({keyword: newKeyword});
    };

    const onDeleteHandler = (id) => {
        deleteNote(id);
        setNotes(getArchivedNotes());
    };

    const onUnarchiveHandler = (id) => {
        unarchiveNote(id);
        setNotes(getArchivedNotes());
    };

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(keyword.toLowerCase())
    );

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