import { Button, TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Choice from '../choice/choice';
import { retrieveRecord, saveRecord } from '../services/apiService';
import './registryForm.css';

export default function RegistryForm() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState();
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [registrationTexts, setRegistrationTexts] = useState();
  const [registrationCalls, setRegistrationCalls] = useState();
  const [registrationEmail, setRegistrationEmail] = useState();
  const [registrationMail, setRegistrationMail] = useState();
  const [electionTexts, setElectionTexts] = useState();
  const [electionCalls, setElectionCalls] = useState();
  const [electionEmail, setElectionEmail] = useState();
  const [electionMail, setElectionMail] = useState();
  const [messageState, setMessageState] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      getRecord(id);
    }
  }, [id]);

  function getRecord(uuid) {
    const phoneRecord = retrieveRecord(JSON.stringify({ uuid }));
    phoneRecord.then((response) => {
      return response.json();
    }).then((jsonObject) => {
      setPhoneNumber(jsonObject.phone);
    });
  }

  function handlePhoneNumberChange(newValue) {
    setPhoneNumber(newValue);
  }

  function handleSubmission() {
    if (typeof phoneNumber === 'undefined') {
      return;
    }
    if (validatePhoneNumber(phoneNumber) && !emailError) {
      const recordSaveResponse = saveRecord(
        JSON.stringify({
          name,
          email,
          address,
          zip,
          phoneNumber,
          registrationEmail,
          registrationMail,
          registrationTexts,
          registrationCalls,
          electionEmail,
          electionMail,
          electionTexts,
          electionCalls
        })
      );
      recordSaveResponse.then((response) => {
        if (response.status === 200) {
          handleSnackbarOpen("Success!");
        } else {
          handleSnackbarOpen("Oops, something went wrong. " + response.status);
        }
      });
      return;
    } else {
      console.log('invalid phone number');
    }
  }

  function validatePhoneNumber(value) {
    return matchIsValidTel(value);
  }

  function handleSnackbarOpen(message) {
    setMessageState(message);
    setOpenSnackbar(true);
  }

  function handleSnackbarClose() {
    setOpenSnackbar(false);
  }

  function handleNameChange(newValue) {
    setName(newValue);
  }

  function handleEmailChange(newValue) {
    setEmail(newValue);
    let re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (re.test(newValue) || newValue === '') {
      setEmailError(false);
    }
    else {
      setEmailError(true);
    }
  }

  function handleAddressChange(newValue) {
    setAddress(newValue);
  }

  function handleZipChange(newValue) {
    setZip(newValue);
  }

  function addressQuestions() {
    return (
      <>
        <div className='form-item'>
          <Choice medium='mail' value={electionMail} setValue={setElectionMail} />
        </div>
        <div className='form-item'>
          <Choice medium='mail' value={registrationMail} setValue={setRegistrationMail} />
        </div>
      </>);
  }

  function emailQuestions() {
    return (
      <div className='form-item'>
        <Choice medium='email' value={registrationEmail} setValue={setRegistrationEmail} />
      </div>);
  }

  function phoneQuestions() {
    return (
      <>
        <div className='form-item'>
          <Choice medium='phone call' value={registrationCalls} setValue={setRegistrationCalls} />
        </div>
        <div className='form-item'>
          <Choice medium='text' value={electionTexts} setValue={setElectionTexts} />
        </div>
        <div className='form-item'>
          <Choice medium='text' value={registrationTexts} setValue={setRegistrationTexts} />
        </div>
      </>);
  }

  return (
    <div className='form-layout'>
      <div>
        Provide the information you wish, and controls will appear.
      </div>
      <div className='form-list'>
        <div className='category-card'>
          <TextField
            name='name'
            variant='outlined'
            placeholder='Name'
            className='name-input-field form-item'
            value={name}
            onChange={(event) => {
              handleNameChange(event.target.value);
            }} />
          <TextField
            name='address'
            variant='outlined'
            placeholder='Address'
            className='address-input-field form-item'
            value={address}
            multiline
            onChange={(event) => {
              handleAddressChange(event.target.value);
            }} />
          <TextField
            name='zip'
            variant='outlined'
            placeholder='Zip Code'
            className='zip-input-field form-item'
            value={zip}
            onChange={(event) => {
              handleZipChange(event.target.value);
            }} />
          {name && address && zip && addressQuestions()}
        </div>
        <div className='category-card'>
          <TextField
            name='email'
            variant='outlined'
            type='email'
            placeholder='Email'
            className='email-input-field form-item'
            value={email}
            error={emailError}
            onChange={(event) => {
              handleEmailChange(event.target.value);
            }} />
          {email && emailQuestions()}
        </div>
        <div className='category-card'>
          <MuiTelInput
            name='phone'
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder='Phone Number'
            className='form-item'
            forceCallingCode='true'
            defaultCountry='US'
          />
          {phoneNumber && phoneQuestions()}
        </div>
      </div>
      <Button variant="contained" size="large" onClick={handleSubmission}>submit</Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={messageState}
      />
    </div>
  )
}

/*

        <div className='category-name'>
          upcoming registration deadlines
        </div>
        <div className='category-name'>
          upcoming elections
        </div>
*/
