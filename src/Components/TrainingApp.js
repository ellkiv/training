import React, { useState, useEffect, useRef } from 'react'

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS

import dayjs from 'dayjs'

export default function TrainingApp() {
    const [error, setError] = useState('');
    const [trainings, setTrainings] = useState([]);
    const gridRef = useRef();

    const columns = [
        {
            headerName: 'Date',
            field: 'date',
            cellRenderer: (data) => {
                return dayjs(data.value).format('DD.MM.YYYY HH:mm')
            },
            sortable: true,
            filter: true,
            floatingFilter: 'agTextColumnFilter'
        },
        {
            headerName: 'Duration',
            field: 'duration',
            sortable: true,
            filter: true,
            floatingFilter: 'agTextColumnFilter'
        },
        {
            headerName: 'Activity',
            field: 'activity',
            sortable: true,
            filter: true,
            floatingFilter: 'agTextColumnFilter'
        },
        {
            headerName: 'Customer',
            field: 'customer',
            cellRenderer: (data) => {
                return data.value.firstname + ' ' + data.value.lastname;
            },
            sortable: true,
            filter: true,
            floatingFilter: 'agTextColumnFilter'
        }
    ]

    useEffect(() => fetchData(), []);

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
            console.log(responseData);
            setTrainings(responseData);
        })
        .catch(error => {
            setError(`Try again (${error.message})`);
            setTrainings(null);
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
                rowData={trainings}
                animateRows={true}
                >
            </AgGridReact>
            <p>{error}</p>
        </div>
    )
}