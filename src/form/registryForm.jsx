import Button from '@mui/material/Button';
import axios from "axios";
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import React, { useState } from 'react';
import Choice from '../choice/choice';
import { saveRecord } from '../services/apiService';
import './registryForm.css';

export default function RegistryForm () {
  const [phoneNumber, setPhoneNumber] = useState();
  const [registrationTexts, setRegistrationTexts] = useState();
  const [registrationCalls, setRegistrationCalls] = useState();
  const [electionTexts, setElectionTexts] = useState();
  const [electionCalls, setElectionCalls] = useState();

  React.useEffect(() => {
    /*
    axios()
      .then((response) => {setData(response.data.message)});
    */
  }, []);

  function handlePhoneNumberChange (newValue) {
    setPhoneNumber(newValue);
  }

  function handleSubmission() {
    if(typeof phoneNumber === 'undefined')
    {
      return;
    } 
    if( validatePhoneNumber(phoneNumber)) {
      saveRecord(
        JSON.stringify({
          phoneNumber,
          registrationTexts,
          registrationCalls,
          electionTexts,
          electionCalls
        })
      );
      return;
    }
  }

  function validatePhoneNumber(value) {
    return matchIsValidTel(value);
  }

  return(
    <div className='form-list'>
      <MuiTelInput 
        value={phoneNumber} 
        onChange={handlePhoneNumberChange}
        className='form-item'
        forceCallingCode='true'
        defaultCountry='US'
      />
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
      <Button variant="contained" size="large" onClick={handleSubmission}>submit</Button>
    </div>
  )
}