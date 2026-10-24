import React from 'react';

function NoteActionButton({ label, variant, onClick, dateTestId = 'note-item-action' }){
    return (
        <button
            type="button"
            className={`note-item__${variant}-button`}
            onClick={onClick}
            data-testid={dateTestId}
        >
            {label}
        </button>
    );
}

export default NoteActionButton;