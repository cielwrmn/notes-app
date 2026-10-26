import React from 'react';

function NoteActionButton({ label, variant, onClick, dataTestId = 'note-item-action' }){
    return (
        <button
            type="button"
            className={`note-item__${variant}-button`}
            onClick={onClick}
            data-testid={dataTestId}
        >
            {label}
        </button>
    );
}

export default NoteActionButton;