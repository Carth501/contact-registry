import { Checkbox } from '@mui/material';
import React from 'react';
import './choice';
import './choice.css';

export default function Choice({ label, value, setValue, enabled }) {
    function handleClick(value) {
        setValue(value);
    }

    return (
        <div className='form-item'>
            <Checkbox onClick={() => { handleClick(!value) }} disabled={!enabled} />
            <span className={enabled ? '' : 'grayed-out'}>
                {label}
            </span>
        </div>
    )
}