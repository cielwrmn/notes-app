import React from 'react';
import { Link } from 'react-router-dom';

function AddButton(){
    return(
        <Link 
            to="/notes/new" 
            className='add-button'
            title='Tambah Catatan'
        >
            +
        </Link>
    );
}

export default AddButton;