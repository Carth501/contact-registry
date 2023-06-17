import { Input, Button } from '@mui/material';
import React from 'react';
import './dashboard.css';

export default function Dashboard () {

    return(
        <div className='content-tube'>
            <div className='dashboard'>
                <Input placeholder='api key' className='api-input-field dashboard-item'/>
                <Button variant="outlined">Submit</Button>

            </div>
            
            <div className='contact-info'>Contact me: carth501@gmail.com</div>
        </div>
    );
}