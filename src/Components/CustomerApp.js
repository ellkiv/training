import React, { useState, useEffect, useRef } from 'react'

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import Button from '@mui/material/Button';

import AddCustomer from './AddCustomer';

export default function CustomerApp() {
    const customerAPI = 'https://customerrest.herokuapp.com/api/customers';
    const [error, setError] = useState('');
    const [customers, setCustomers] = useState([]);
    const gridRef = useRef();

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
            console.log(responseData.content);
            setCustomers(responseData.content);
        })
        .catch(error => {
            setError(`Try again (${error.message})`);
            setCustomers(null);
        });
    }

    // poista
    //lisää viesti poiston onnistumisesta
    const deleteCustomerFunc = (link) => {
        console.log(link);
        if(window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
        }
    }

    //uusi
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

    /*//päivitä
    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }*/


    const columns = [
        {
            width: 100,
            headerName: 'DEL FIELD',
            field: 'links[1].href',
/*
            cellRenderer: row =>
                <Button
                    variant='outlined'
                    color='error'
                    size='small'
                    onClick = {() => deleteCustomerFunc(row.value)}
                >
                    Delete
                </Button>
*/
        },
/*        {
            width: 100,
            headerName: '',
            field: '',
            cellRenderer: row => <EditCustomer updateCustomer={updateCustomer} customer={row.data}/>
        },
*/
        {
            headerName: 'First name',
            field: 'firstname',
            sortable: true,
            filter: true,
            floatingFilter: 'agTextColumnFilter'
        },
        {
            headerName: 'Last name',
            field: 'lastname',
            sortable: true,
            filter: true,
            floatingFilter: 'agTextColumnFilter'
        },
        {
            headerName: 'Phone number',
            field: 'phone',
            sortable: true,
            filter: true,
            floatingFilter: 'agTextColumnFilter'
        },
        {
            headerName: 'Email',
            field: 'email',
            sortable: true,
            filter: true,
            floatingFilter: 'agTextColumnFilter'
        },
        {
            headerName: 'Street adress',
            field: 'streetaddress',
            sortable: true,
            filter: true,
            floatingFilter: 'agTextColumnFilter'
        },
        {
            headerName: 'Postcode',
            field: 'postcode',
            sortable: true,
            filter: true,
            floatingFilter: 'agTextColumnFilter'
        },
        {
            headerName: 'City',
            field: 'city',
            sortable: true,
            filter: true,
            floatingFilter: 'agTextColumnFilter'
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
                >
            </AgGridReact>
            <p>{error}</p>
        </div>
    );
}