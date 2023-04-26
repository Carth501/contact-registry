import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';
import './registryForm.css';

export default function RegistryForm () {

    return(
      <div className='form-list'>
        <TextField placeholder='phone number' className='form-item'/>
        <div className='form-item'>
          upcoming registration deadlines
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>I want to receive texts.</Button>
            <Button>I do not want to receive texts.</Button>
          </ButtonGroup>
        </div>
        <div className='form-item'>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>I want to receive phone calls.</Button>
            <Button>I do not want to receive phone calls.</Button>
          </ButtonGroup>
        </div>
        <div className='form-item'>
          upcoming elections
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>I want to receive texts.</Button>
            <Button>I do not want to receive texts.</Button>
          </ButtonGroup>
        </div>
        <div className='form-item'>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>I want to receive phone calls.</Button>
            <Button>I do not want to receive phone calls.</Button>
          </ButtonGroup>
        </div>
      </div>
    )
}
