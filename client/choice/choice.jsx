import { Checkbox } from '@mui/material';
import React from 'react';
import './choice';

export default function Choice({ label, value, setValue }) {
    function handleClick(value) {
        setValue(value);
    }

    return (
        <div className='form-item'>
            <Checkbox onClick={() => { handleClick(!value) }} /> {label}
        </div>
    )
}