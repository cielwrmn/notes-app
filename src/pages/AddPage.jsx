import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/network-data';

function AddPage() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    const onTitleChangeEventHandler = (event) => {
        if(event.target.value.length <= 50){
            setTitle(event.target.value);
        }
    };

    const onBodyChangeEventHandler = (event) => {
        setBody(event.target.value);
    };

    const onSubmitEventHandler = async (event) => {
        event.preventDefault();

        const { error } = await addNote({
            title: title,
            body: body,
        });

        if(!error){
            navigate('/');
        }
    };

    const remainingChars = 50 - title.length;

    return (
        <div className="note-input" data-testid="note-input">
            <h2>Buat Catatan</h2>

            <form 
                onSubmit={onSubmitEventHandler}
                data-testid="note-input-form"
            >
                <p 
                    className="note-input__title__char-limit"
                    data-testid="note-input-title-char-limit"
                >
                    Sisa karakter: {remainingChars}
                </p>

                <input
                    className="note-input__title"
                    type="text"
                    placeholder="Ini adalah judul ..."
                    value={title}
                    onChange={onTitleChangeEventHandler}
                    required
                    data-testid="note-input-title"
                />

                <textarea
                    className="note-input__body"
                    placeholder="Tuliskan catatanmu di sini ..."
                    value={body}
                    onChange={onBodyChangeEventHandler}
                    required
                    data-testid="note-input-body-field"
                />
                <button type="submit" data-testid="note-input-submit-button">
                    Buat
                </button>
            </form>
        </div>
    );
}

export default AddPage;