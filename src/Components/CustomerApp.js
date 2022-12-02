import React, { useState, useEffect, useRef } from 'react'

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import DelCustomer from './DelCustomer';

export default function CustomerApp() {
    const customerAPI = 'https://customerrest.herokuapp.com/api/customers';
    const [error, setError] = useState('');
    const [customers, setCustomers] = useState([]);
    const gridRef = useRef();

    const columnTypes = {
        filterAndSort: {
            sortable: true,
            filter: true,
            floatingFilter: 'agTextColumnFilter'
        }
    }

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

    const columns = [
        {
            width: 70,
            headerName: '',
            field: 'delete',
            cellRenderer: row =>
                <DelCustomer
                    link={row.data.links[0].href}
                    deleteCustomerFunc={deleteCustomerFunc}
                />
        },
        {
            width: 70,
            headerName: '',
            field: 'edit',
            cellRenderer: row =>
                <EditCustomer
                    updateCustomer={updateCustomer}
                    customer={row.data}
                    link={row.data.links[0].href}
                />
        },
        {
            width: 150,
            headerName: '',
            field: 'addAct',
            cellRenderer: row =>
                <AddTraining
                    saveTraining={saveTraining}
                    customer={row.data}
                    link={row.data.links[0].href}
                />
        },
        {
            headerName: 'First name',
            field: 'firstname',
            type: 'filterAndSort'
        },
        {
            headerName: 'Last name',
            field: 'lastname',
            type: 'filterAndSort'
        },
        {
            headerName: 'Phone number',
            field: 'phone',
            type: 'filterAndSort'
        },
        {
            headerName: 'Email',
            field: 'email',
            type: 'filterAndSort'
        },
        {
            headerName: 'Street adress',
            field: 'streetaddress',
            type: 'filterAndSort'
        },
        {
            headerName: 'Postcode',
            field: 'postcode',
            type: 'filterAndSort'
        },
        {
            headerName: 'City',
            field: 'city',
            type: 'filterAndSort'
        }
    ]

    return (
        <div
            className="ag-theme-material"
                style={{
                    width: '95%',
                    height: 500,
                    margin: 'auto'}}
        >
            <AddCustomer saveCustomer={saveCustomer} />
            <AgGridReact
                ref={gridRef}
                onGridReady={
                    params => gridRef.current = params.api
                }
                rowSelection='single'
                columnDefs={columns}
                rowData={customers}
                animateRows={true}
                columnTypes={columnTypes}
                >
            </AgGridReact>
            <Snackbar open={openAlert} autoHideDuration={5000} onClose={closeAlert}>
                <Alert onClose={closeAlert} severity="success" sx={{ width: '100%' }}>
                    Operation was successful!
                </Alert>
            </Snackbar>
            <p>{error}</p>
        </div>
    );
}