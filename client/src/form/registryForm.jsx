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
  const [textUpcomingElection, setTextUpcomingElection] = useState();
  const [textCampaign, setTextCampaign] = useState();
  const [textVRDeadline, setTextVRDeadline] = useState();
  const [textElectionResults, setTextElectionResults] = useState();
  const [textLegislativeActivity, setTextLegislativeActivity] = useState();
  const [voiceCampaign, setVoiceCampaign] = useState();
  const [voiceRoboCalls, setVoiceRoboCalls] = useState();
  const [mailUpcomingElection, setMailUpcomingElection] = useState();
  const [mailCampaign, setMailCampaign] = useState();
  const [mailVRDeadline, setMailVRDeadline] = useState();
  const [emailUpcomingElection, setEmailUpcomingElection] = useState();
  const [emailCampaign, setEmailCampaign] = useState();
  const [emailVRDeadline, setEmailVRDeadline] = useState();
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
          textUpcomingElection,
          textCampaign,
          textVRDeadline,
          textElectionResults,
          textLegislativeActivity,
          voiceCampaign,
          voiceRoboCalls,
          mailUpcomingElection,
          mailCampaign,
          mailVRDeadline,
          emailUpcomingElection,
          emailCampaign,
          emailVRDeadline,
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
    const enabled = name && address && zip;

    return (
      <>
        <Choice label='Upcoming election alerts' value={mailUpcomingElection} setValue={setMailUpcomingElection} enabled={enabled} />
        <Choice label='Campaign solicitation' value={mailCampaign} setValue={setMailCampaign} enabled={enabled} />
        <Choice label='Voter registration reminders' value={mailVRDeadline} setValue={setMailVRDeadline} enabled={enabled} />
      </>);
  }

  function emailQuestions() {
    const enabled = email && !emailError;
    return (
      <>
        <Choice label='Upcoming election alerts' value={emailUpcomingElection} setValue={setEmailUpcomingElection} enabled={enabled} />
        <Choice label='Campaign solicitation' value={emailCampaign} setValue={setEmailCampaign} enabled={enabled} />
        <Choice label='Voter registration reminders' value={emailVRDeadline} setValue={setEmailVRDeadline} enabled={enabled} />
      </>);
  }

  function phoneQuestions() {
    const enabled = phoneNumber && validatePhoneNumber(phoneNumber);
    return (
      <>
        Texts
        <Choice label='Upcoming election alerts' value={textUpcomingElection} setValue={setTextUpcomingElection} enabled={enabled} />
        <Choice label='Campaign solicitation' value={textCampaign} setValue={setTextCampaign} enabled={enabled} />
        <Choice label='Voter registration reminders' value={textVRDeadline} setValue={setTextVRDeadline} enabled={enabled} />
        <Choice label='Election results' value={textElectionResults} setValue={setTextElectionResults} enabled={enabled} />
        <Choice label='Legislative activty' value={textLegislativeActivity} setValue={setTextLegislativeActivity} enabled={enabled} />
        Phone Calls
        <Choice label='Campaign solicitation' value={voiceCampaign} setValue={setVoiceCampaign} enabled={enabled} />
        <Choice label='Robocalls' value={voiceRoboCalls} setValue={setVoiceRoboCalls} enabled={enabled} />
      </>);
  }

  return (
    <div className='form-layout'>
      <div className='header'>
        <h1 className='header-items'>Contact Registry</h1>
      </div>
      <div className='form-list'>
        <div className='category-card'>
          <div className='category-fields'>
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
          </div>
          {addressQuestions()}
        </div>
        <div className='category-card'>
          <div className='category-fields'>
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
          </div>
          {emailQuestions()}
        </div>
        <div className='category-card'>
          <div className='category-fields'>
            <MuiTelInput
              name='phone'
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder='Phone Number'
              className='form-item'
              forceCallingCode='true'
              defaultCountry='US'
            />
          </div>
          {phoneQuestions()}
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
