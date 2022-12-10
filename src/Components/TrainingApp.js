import React, { useState, useEffect, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import dayjs from 'dayjs';

import DelTraining from './DelTraining';

export default function TrainingApp( {trainings, setTrainings}) {

    const [error, setError] = useState('');
    const gridRef = useRef();

    const columnTypes = {
        filterAndSort: {
            sortable: true,
            filter: true
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

    const deleteTrainingFunc = (id) => {
        console.log(id);
        fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, {method: 'DELETE'})
        .then(res => {
            fetchData();
            setOpenAlert(true);
        })
        .catch(err => console.error(err))
    }

    const columns = [
        {
            width: 60,
            headerName: '',
            field: 'del_id',
            cellRenderer: row => <DelTraining id={row.data.id} deleteTrainingFunc={deleteTrainingFunc} />
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
        <div>
            <div
                className="ag-theme-material"
                    style={{
                        width: '95%',
                        height: 600,
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
                <Snackbar open={openAlert} autoHideDuration={5000} onClose={closeAlert}>
                    <Alert onClose={closeAlert} severity="success" sx={{ width: '100%' }}>
                        Operation was successful!
                    </Alert>
                </Snackbar>
                <p>{error}</p>
            </div>
        </div>

    )
}