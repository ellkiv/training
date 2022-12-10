import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Toolbar from '@mui/material/Toolbar';

import AddCustomer from './AddCustomer';
import CSV from './CSV'
import CustomerTable from './CustomerTable';

export default function CustomerApp() {
    const customerAPI = 'https://customerrest.herokuapp.com/api/customers';
    const [error, setError] = useState('');
    const [customers, setCustomers] = useState([]);

    const [openAlert, setOpenAlert] = useState(false);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const closeAlert = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpenAlert(false);
    };

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch(customerAPI)
        .then(response => {
            console.log(response);
            if (response.ok){
                return response.json();
            } else {
                throw (new Error(response.statusText));
            } 
        })
        .then(responseData => {
            setCustomers(responseData.content);
        })
        .catch(error => {
            setError(`Error (${error.message})`);
        });
    }

    const deleteCustomerFunc = (link) => {
        console.log(link);
            fetch(link, {method: 'DELETE'})
            .then(res => {
                fetchData();
                setOpenAlert(true);
            })
            .catch(err => console.error(err))
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => {
            fetchData();
            setOpenAlert(true);
        })
        .catch(err => console.error(err))
    }

    const saveCustomer = (customer) => {
        fetch(customerAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => {
            fetchData();
            setOpenAlert(true);
        })
        .catch(err => console.error(err))
    }

    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => {
            fetchData();
            setOpenAlert(true);
        })
        .catch(err => console.error(err))
    }

    return (
        <div>
            <Toolbar>
                <AddCustomer saveCustomer={saveCustomer} />
                <CSV customers={customers} />
            </Toolbar> 
            <div>
                <CustomerTable
                    customers={customers}
                    deleteCustomerFunc={deleteCustomerFunc}
                    updateCustomer={updateCustomer}
                    saveTraining={saveTraining}
                />
            </div>
            <Snackbar open={openAlert} autoHideDuration={5000} onClose={closeAlert}>
                <Alert onClose={closeAlert} severity="success" sx={{ width: '100%' }}>
                    Operation was successful!
                </Alert>
            </Snackbar>
            <p>{error}</p>
        </div>
    );
}