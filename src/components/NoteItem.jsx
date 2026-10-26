import React from 'react';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../utils/index';
import NoteActionButton from './NoteActionButton';

function escapeRegex(text){
    return text.replace(
        /[-[\]{}()*+?.,\\^$|#\s]/g,
        '\\$&'
    );
}

function highlightText(text, keyword){
    if(!keyword){
        return text;
    }

    const escapedKeyword = escapeRegex(keyword);
    const regex = new RegExp(
        `(${escapedKeyword})`,
        'gi'
    );

    return text.split(regex).map((part, index) => {
        if(part.toLowerCase() === keyword.toLowerCase()){
            return <mark key={index}>{part}</mark>;
        }
        return part;
    });
}

function NoteItem({ id, title, body, createdAt, onDelete, archived, onArchive, searchKeyword }){
    console.log(searchKeyword);

    return(
        <div
            className="note-item"
            data-testid="note-item"
            data-note-id={id}
        >
            <div 
                className="note-item__content" 
                data-testid="note-item-content"
            >
                <h3 className="note-item__title" data-testid="note-item-title">                    
                    <Link 
                        to={`/notes/${id}`} 
                        style={{ 
                            textDecoration: 'underline',
                            color: 'inherit' 
                        }} 
                    >
                        {highlightText(title, searchKeyword)}
                    </Link>
                </h3>
                
                <p className="note-item__date" data-testid="note-item-date">
                    {showFormattedDate(createdAt)}
                </p>
                <p className="note-item__body" data-testid="note-item-body">
                    {highlightText(body, searchKeyword)}
                </p>
            </div>
            <div className="note-item__action" data-testid="note-item-action">
                <NoteActionButton
                    label="Delete"
                    variant="delete"
                    onClick={() => onDelete(id)}
                    dataTestId="note-item-delete-button"
                />
                <NoteActionButton
                    label={archived ? "Unarchive" : "Archive"}
                    variant={archived ? "unarchive" : "archive"}
                    onClick={() => onArchive(id)}
                    dataTestId="note-item-archive-button"
                />
            </div>
        </div>
    )
}

export default NoteItem;