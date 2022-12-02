import React, { useState, useEffect, useRef } from 'react'

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import dayjs from 'dayjs'

import Confirmation from './DelConfir'

//nimiä ei voi lajitella (koska kaksi tietokenttää yhdessä?)

export default function TrainingApp() {
    const [error, setError] = useState('');
    const [trainings, setTrainings] = useState([]);
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

    // poista
    const deleteTrainingFunc = (id) => {
        console.log(id);
        fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const columns = [
        {
            width: 60,
            headerName: '',
            field: 'del_id',
            cellRenderer: row => <Confirmation id={row.data.id} deleteTrainingFunc={deleteTrainingFunc} />
        },
        {
            headerName: 'Date',
            field: 'date',
            cellRenderer: (data) => {
                return dayjs(data.value).format('DD.MM.YYYY HH:mm')
            },
            type: 'filterAndSort'
        },
        {
            headerName: 'Duration',
            field: 'duration',
            type: 'filterAndSort'
        },
        {
            headerName: 'Activity',
            field: 'activity',
            type: 'filterAndSort'
        },
        {
            headerName: 'Customer',
            field: 'customer',
            cellRenderer: (data) => {
                return data.value.firstname + ' ' + data.value.lastname;
            },
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
            <AgGridReact
                ref={gridRef}
                onGridReady={
                    params => gridRef.current = params.api
                }
                rowSelection='single'
                columnDefs={columns}
                rowData={trainings}
                animateRows={true}
                columnTypes={columnTypes}
                >
            </AgGridReact>
            <p>{error}</p>
        </div>
    )
}