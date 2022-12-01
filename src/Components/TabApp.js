import React, { useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import {
    BrowserRouter,
    Routes,
    Route,
    Link,
  } from 'react-router-dom';

import CustomerApp from './CustomerApp'
import TrainingApp from './TrainingApp'


export default function TabApp() {
    const [value, setValue] = useState('customers');

    const handleChange = (event, value) => {
        setValue(value);
    };

    return (
        <div>
            <BrowserRouter>
                <Tabs value={value} onChange={handleChange}>
                    <Tab
                        value='training'
                        label='Training'
                        component={Link}
                        to="/TrainingApp"
                    />
                    <Tab
                        value='customers'
                        label='Customers'
                        component={Link}
                        to='/CustomerApp'
                    />
                </Tabs>
                <Routes>
                    <Route path='/TrainingApp' element={<TrainingApp />} />
                    <Route path='*' element={<CustomerApp />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}