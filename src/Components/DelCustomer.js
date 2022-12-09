import React, { useState} from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UndoIcon from '@mui/icons-material/Undo';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//snackbar aukeaa väärään kohtaan(ensimmäinen ei näy)

export default function DelCustomer(props) {
    const [open, setOpen] = useState(false);
    const [link, setLink] = useState('');

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    const handleClick = () => {
        console.log(props.link);
        setLink(props.link);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    const deleteCustomer = () => {
        props.deleteCustomerFunc(link);
        handleClose();
    }

    const action = (
        <React.Fragment>
            <Button onClick={handleClose} startIcon={<UndoIcon />}></Button>
            <Button onClick={deleteCustomer}>
                Delete
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
            <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <div>
                <Button
                    color='error'
                    startIcon={<DeleteForeverIcon />}
                    onClick = {handleClick}
                    >
                </Button>
            </div>
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    action={action}
                >
                    <Alert onClose={handleClose} action={action} severity="warning" sx={{ width: '100%' }}>
                        Do you want to Delete this customer?
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}