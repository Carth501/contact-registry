import { Input, Button } from '@mui/material';
import React, { useState } from 'react';
import './client.css';
import { saveClient } from '../services/apiService';

export default function Client () {
    const [name, setName] = useState("");

    function handleNameChange (newValue) {
      setName(newValue);
    }

    function handleRequestAPI () {
        console.log('api key requested for ' + name);
        if(name) {
          saveClient(
            JSON.stringify({
              name
            })
          );
          return;
        }
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
        </div>
    );
}