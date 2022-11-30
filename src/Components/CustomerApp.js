import React, { useState, useEffect, useRef } from 'react'

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS

//import Button from'@mui/material/Button';

export default function CustomerApp() {
    const [error, setError] = useState('');
    const [customers, setCustomers] = useState([]);
    const gridRef = useRef();

    const columns = [
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

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => {
            console.log(response);
            if (response.ok){
                return response.json();
            } else {
                throw (new Error(response.statusText));
            } 
        })
        .then(responseData => {
            console.log(responseData);
            setCustomers(responseData.content);
        })
        .catch(error => {
            setError(`Try again (${error.message})`);
            setCustomers(null);
        });
    }

    return (
        <div
            className="ag-theme-material"
                style={{
                    width: '95%',
                    height: 700,
                    margin: 'auto'}}
        >
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