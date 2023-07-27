import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import './choice';

export default function Choice({ medium, value, setValue }) {
    function handleClick(value) {
        setValue(value);
    }

    return (
        <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button onClick={() => { handleClick(true) }} className='choice-button'>
                I would like {medium} solicitation. {value && " ✔"}
            </Button>
            <Button onClick={() => { handleClick(false) }} className='choice-button'>
                I do not want any {medium} solicitation. {value === false && " ✔"}
            </Button>
        </ButtonGroup>
    )
}