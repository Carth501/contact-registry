import Button from '@mui/material/Button';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import React, { useState } from 'react';
import Choice from '../choice/choice';
import { saveRecord, retrieveRecord } from '../services/apiService';
import { useParams } from 'react-router-dom'
import './registryForm.css';

export default function RegistryForm () {
  const [phoneNumber, setPhoneNumber] = useState();
  const [registrationTexts, setRegistrationTexts] = useState();
  const [registrationCalls, setRegistrationCalls] = useState();
  const [electionTexts, setElectionTexts] = useState();
  const [electionCalls, setElectionCalls] = useState();
  const { id } = useParams();

  React.useEffect(() => {
    if(id){
      console.log('id found! id = ' + id);
      getRecord(id);
    }
  }, [id]);

  function getRecord (uuid) {
    const phoneRecord = retrieveRecord(JSON.stringify({uuid}));
    phoneRecord.then((response) => {
      return response.json();
    }).then((jsonObject) => {
      console.log('phone lookup complete: ' + jsonObject.phone);
      setPhoneNumber(jsonObject.phone);
    });
  }

  function handlePhoneNumberChange (newValue) {
    setPhoneNumber(newValue);
  }

  function handleSubmission() {
    if(typeof phoneNumber === 'undefined')
    {
      return;
    } 
    if( validatePhoneNumber(phoneNumber)) {
      console.log('submitting record');
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
    } else {
      console.log('invalid phone number');
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