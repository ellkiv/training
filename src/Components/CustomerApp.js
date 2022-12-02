import React, { useState, useEffect, useRef } from 'react'

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

import AddTraining from './AddTraining';

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

    //window confirmin tilalle snackbar
    //lisää viesti poiston onnistumisesta
    const deleteCustomerFunc = (link) => {
        console.log(link);
        if(window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
        }
    }

    //päivitä
    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    //uusiAsiakas
    const saveCustomer = (customer) => {
        fetch(customerAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    //uusiTreeni
    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const columns = [
        {
            width: 70,
            headerName: '',
            field: 'delete',
            cellRenderer: row =>
                <Button
                    color='error'
                    startIcon={<DeleteForeverIcon />}
                    onClick = {() => deleteCustomerFunc(row.data.links[0].href)}
                >
                </Button>
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
                    height: 700,
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
            <p>{error}</p>
        </div>
    );
}