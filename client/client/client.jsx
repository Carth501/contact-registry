import { Input, Button } from '@mui/material';
import React, { useState } from 'react';
import './client.css';
import { saveClient } from '../services/apiService';

export default function Client () {
    const [name, setName] = useState("");
    const [apikey, setApikey] = useState("");

    function handleNameChange (newValue) {
      setName(newValue);
    }

    function handleRequestAPI () {
        console.log('api key requested for ' + name);
        if(name) {
            const apikeyPromise = saveClient(
                JSON.stringify({
                    name
                })
            )
            apikeyPromise.then((response) => {
                return response.json();
            }).then((jsonObject) => {
                setApikey(jsonObject.apikey);
            });
            return;
        }
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(apikey);
    }

    return(
        <div className='content-tube'>
            <div className='naming-form'>
                <Input 
                    placeholder='name'
                    className='name-input-field'
                    value={name} 
                    onChange={(event) => {
                        handleNameChange(event.target.value);
                    }}/>
                <Button 
                    variant="outlined"
                    onClick={() => {handleRequestAPI()}}
                >
                    Request API key
                </Button>
            </div>
            <div className='apikey'>
                {!!apikey &&
                    <>
                        <div>
                            API key: {apikey}
                        </div>
                        <Button variant='outlined' onClick={() => {copyToClipboard()}}>
                            Copy
                        </Button>
                    </>
                }
            </div>
        </div>
    );
}