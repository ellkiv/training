import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import TrainingTable from './TrainingTable';

export default function TrainingApp({trainings, fetchData, error}) {
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

    useEffect(() => {
        fetchData();
        console.log('trainingapp')
    }, []);

    const deleteTrainingFunc = (id) => {
        console.log(id);
        fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, {method: 'DELETE'})
        .then(res => {
            fetchData();
            console.log('fetched');
            setOpenAlert(true);
        })
        .catch(err => console.error(err))
    };

    return (
        <div>
            <TrainingTable trainings={trainings} deleteTrainingFunc={deleteTrainingFunc} />
            <Snackbar open={openAlert} autoHideDuration={5000} onClose={closeAlert}>
                <Alert onClose={closeAlert} severity="success" sx={{ width: '100%' }}>
                    Operation was successful!
                </Alert>
            </Snackbar>
            <p>{error}</p>
        </div>
    )
}