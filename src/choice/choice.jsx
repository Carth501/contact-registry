import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';

export default function Choice ({medium, value, setValue}) {
    function handleClick(value) {
        setValue(value);
    }

    return (
        <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button onClick={() => {handleClick(true)}}>
                I want to receive {medium}. {value && " ✔"}
            </Button>
            <Button onClick={() => {handleClick(false)}}>
                I do not want to receive  {medium}. {value === false && " ✔"}
            </Button>
        </ButtonGroup>
    )
}