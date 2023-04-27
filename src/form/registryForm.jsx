import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import './registryForm.css';
import Choice from '../choice/choice';

export default function RegistryForm () {
  const [registrationTexts, setRegistrationTexts] = useState(null);
  const [registrationCalls, setRegistrationCalls] = useState(null);
  const [electionTexts, setElectionTexts] = useState(null);
  const [electionCalls, setElectionCalls] = useState(null);


  return(
    <div className='form-list'>
      <TextField placeholder='phone number' className='form-item'/>
      <div className='form-item'>
        upcoming registration deadlines
        <Choice medium='texts' value={registrationTexts} setValue={setRegistrationTexts} />
      </div>
      <div className='form-item'>
        <Choice medium='phone calls' value={registrationCalls} setValue={setRegistrationCalls} />
      </div>
      <div className='form-item'>
        upcoming elections
        <Choice medium='texts' value={electionTexts} setValue={setElectionTexts} />
      </div>
      <div className='form-item'>
        <Choice medium='phone calls' value={electionCalls} setValue={setElectionCalls} />
      </div>
      <Button variant="contained" size="large">submit</Button>
    </div>
  )
}
