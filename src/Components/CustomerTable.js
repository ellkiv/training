import React, { useRef } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import DelCustomer from './DelCustomer';

export default function CustomerTable(props) {
    const gridRef = useRef();

    const columnTypes = {
        filterAndSort: {
            sortable: true,
            filter: true,
            floatingFilter: 'agTextColumnFilter'
        }
    }

    const columns = [
        {
            width: 70,
            headerName: '',
            field: 'delete',
            cellRenderer: row =>
                <DelCustomer
                    link={row.data.links[0].href}
                    deleteCustomerFunc={props.deleteCustomerFunc}
                />
        },
        {
            width: 70,
            headerName: '',
            field: 'edit',
            cellRenderer: row =>
                <EditCustomer
                    updateCustomer={props.updateCustomer}
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
                    saveTraining={props.saveTraining}
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
            <AgGridReact
                ref={gridRef}
                onGridReady={
                    params => gridRef.current = params.api
                }
                rowSelection='single'
                columnDefs={columns}
                rowData={props.customers}
                animateRows={true}
                columnTypes={columnTypes}
                >
            </AgGridReact>
        </div>
    );
}