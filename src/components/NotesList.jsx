import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, onDelete, onArchive, searchKeyword, dataTestId = 'notes-list' }) {
    const hasNotes = notes.length > 0;
    if(!hasNotes){
        return(
            <div className="notes-list" data-testid={dataTestId}>
                <p
                    className="notes-list_empty-message"
                    data-testid={`${dataTestId}-empty`}
                >
                    Belum ada catatan.<br />
                    Silahkan tambahkan catatan sekarang!
                </p>
            </div>
        );
    }

    const groupedNotes = {};
    notes.forEach((note) => {
        const monthYear = new Date(note.createdAt).toLocaleString('id-ID', {
            month: 'long',
            year: 'numeric',
        });

        if(!groupedNotes[monthYear]){
            groupedNotes[monthYear] = [];
        }

        groupedNotes[monthYear].push(note);
    });

    return(
        <div className="notes-list" data-testid={dataTestId}>
            {
                Object.entries(groupedNotes).map(([monthYear, monthNotes]) => {
                    return(
                        <section className="notes-group" key={monthYear}>
                            <h3>{monthYear}</h3>
                            <div className="notes-group__items">
                                {
                                    monthNotes.map((note) => (
                                        <NoteItem 
                                            key={note.id}
                                            id={note.id}
                                            title={note.title}
                                            body={note.body}
                                            createdAt={note.createdAt}
                                            archived={note.archived}
                                            onDelete={onDelete}
                                            onArchive={onArchive}
                                            searchKeyword={searchKeyword}
                                        />
                                    ))
                                }
                            </div>
                            
                        </section>
                    )                           
                })
            }
        </div>
    );
}

export default NotesList;