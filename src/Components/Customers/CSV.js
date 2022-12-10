import { CSVLink } from "react-csv";
import React from 'react';

import Button from '@mui/material/Button';

export default function CSV(props) {

    const headers = [
        {label: 'First name', key: 'firstname' },
        {label: 'Last name', key: 'lastname' },
        {label: 'Phone', key: 'phone' },
        {label: 'Email', key: 'email' },
        {label: 'Street address', key: 'streetaddress' },
        {label: 'Postcode', key: 'postcode' },
        {label: 'City', key: 'city' }
    ]

    return(
        <div>
            <Button
                style={{
                    margin: 10,
                    display: 'flex'
                }}
            >
                <CSVLink
                    headers={headers}
                    data={props.customers}
                    filename={"customers.csv"}
                    separator={";"}
                >
                    Export to CSV
                </CSVLink>
            </Button>
            
        </div>
    );

}