import React, { useRef } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from 'dayjs';

import DelTraining from './DelTraining';

export default function TrainingTable(props) {

    const gridRef = useRef();

    const columnTypes = {
        filterAndSort: {
            sortable: true,
            filter: true
        }
    };

    const columns = [
        {
            width: 60,
            headerName: '',
            field: 'del_id',
            cellRenderer: row => <DelTraining id={row.data.id} deleteTrainingFunc={props.deleteTrainingFunc} />
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
    ];

    return (
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
                rowData={props.trainings}
                animateRows={true}
                columnTypes={columnTypes}
                >
            </AgGridReact>
        </div>
    )
}