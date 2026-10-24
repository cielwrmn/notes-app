import React from 'react';
import PropTypes from 'prop-types';

function Input({ type, id, name, value, onChange, placeholder, label }){
    return(
        <div className="input-group">
            {label && <label htmlFor={id}>{label}</label>}
            <input 
                type = {type}
                id = {id}
                name = {name}
                value = {value}
                onChange = {onChange}
                placeholder = {placeholder}
                required
            />
        </div>
    );
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
};

export default Input;