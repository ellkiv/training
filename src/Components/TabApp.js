import React, { useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//import AppBar from '@mui/material/AppBar';
//import Toolbar from '@mui/material/Toolbar';
//import Typography from '@mui/material/Typography';
//import Box from '@mui/material/Box';

import {
    BrowserRouter,
    Routes,
    Route,
    Link,
  } from 'react-router-dom';

import CustomerApp from './CustomerApp';
import TrainingApp from './TrainingApp';
import CalendarApp from './CalendarApp';

export default function TabApp() {
    const [value, setValue] = useState('customers');
    const [trainings, setTrainings] = useState([]);

    const handleChange = (event, value) => {
        setValue(value);
    };

    return (
        <div>
            <BrowserRouter>
                <Tabs value={value} onChange={handleChange}>
                    <Tab
                        value='customers'
                        label='Customers'
                        component={Link}
                        to='/CustomerApp'
                    />                    
                    <Tab
                        value='training'
                        label='Training'
                        component={Link}
                        to="/TrainingApp"
                    />
                    <Tab
                        value='calendar'
                        label='Calendar'
                        component={Link}
                        to='/CalendarApp'
                    />
                </Tabs>
                <Routes>
                    <Route path='*' element={<CustomerApp />} />
                    <Route path='/TrainingApp' element={<TrainingApp setTrainings={setTrainings} trainings={trainings} />} />
                    <Route path='/CalendarApp' element={<CalendarApp setTrainings={setTrainings} trainings={trainings} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}