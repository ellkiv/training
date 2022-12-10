import React, { useState } from 'react';
import { AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import CustomerApp from './Customers/CustomerApp';
import TrainingApp from './Trainings/TrainingApp';
import CalendarApp from './Trainings/CalendarApp';
import TrainingChart from './Trainings/TrainingChart'

export default function TabApp() {
    const [value, setValue] = useState('customers');
    const [error, setError] = useState('');
    const [trainings, setTrainings] = useState([]);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => {
            console.log(response);
            if (response.ok){
                return response.json();
            } else {
                throw (new Error(response.statusText));
            } 
        })
        .then(responseData => {
            setTrainings(responseData);
        })
        .catch(error => {
            setError(`Try again (${error.message})`);
        });
    }

    const handleChange = (event, value) => {
        setValue(value);
    };

    return (
        <div>
            <BrowserRouter>
                <AppBar position="static">
                    <Toolbar>
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
                            <Tab
                                value='chart'
                                label='Chart'
                                component={Link}
                                to='/TrainingChart'
                            />
                        </Tabs>
                    </Toolbar>
                </AppBar>
                <Routes>
                    <Route path='*' element={<CustomerApp />} />
                    <Route
                        path='/TrainingApp'
                        element={
                            <TrainingApp
                                trainings={trainings}
                                fetchData={fetchData}
                                error={error}
                            />
                        }
                    />
                    <Route
                        path='/CalendarApp'
                        element={
                            <CalendarApp
                                trainings={trainings}
                                fetchData={fetchData}
                            />
                        }
                    />
                    <Route
                        path='/TrainingChart'
                        element={
                            <TrainingChart
                                trainings={trainings}
                                fetchData={fetchData}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}