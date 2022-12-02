import React, {useState} from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

// pvm syötetään, ei klo aikaa
// snackbarin sijainti on surkea

export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState([]);

    const handleClickOpen = () => {
        console.log(props.customer);
        setTraining({
            date: null,
            duration: '',
            activity: '',
            customer: props.customer.links[0].href
        })
        console.log(training);
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        setTraining({...training, [e.target.name]: e.target.value});
        console.log(training);
    }

    const addTraining = (e) => {
        e.preventDefault();
        props.saveTraining(training);
        handleClose();
        setTraining({date: null, duration: '', activity: '', customer: ''})
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>Add Training</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <Stack spacing={2} sx={{ width: '100%' }}>
                <DialogContent>
                <FormControl sx={{ m:1, minWidth: 150 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={training.date}
                            onChange={date =>
                                setTraining({
                                    date: date,
                                    duration: training.duration,
                                    activity: training.activity,
                                    customer: training.customer
                                })
                            }
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    </FormControl> 
                    <FormControl sx={{ m:1, minWidth: 150 }}>
                        <InputLabel>Duration</InputLabel>
                        <Select
                            name="duration"
                            value={training.duration}
                            label="Duration"
                            onChange={e => handleInputChange(e)}
                        >
                            <MenuItem value={'15'}>15 minutes</MenuItem>
                            <MenuItem value={'30'}>30 minutes</MenuItem>
                            <MenuItem value={'45'}>45 minutes</MenuItem>
                            <MenuItem value={'60'}>one hour</MenuItem>
                            <MenuItem value={'90'}>one hour 30 minutes</MenuItem>
                            <MenuItem value={'120'}>two hours</MenuItem>
                        </Select>
                    </FormControl> 
                    <FormControl sx={{ m:1, minWidth: 150 }}>
                        <InputLabel>Activity</InputLabel>
                        <Select
                            name="activity"
                            value={training.activity}
                            label="Activity"
                            onChange={e => handleInputChange(e)}
                        >
                            <MenuItem value={'Yoga'}>Yoga</MenuItem>
                            <MenuItem value={'Spinning'}>Spinning</MenuItem>
                            <MenuItem value={'Jogging'}>Jogging</MenuItem>
                            <MenuItem value={'Gym Training'}>Gym Training</MenuItem>
                            <MenuItem value={'Fitness'}>Fitness</MenuItem>
                            <MenuItem value={'Zumba'}>Zumba</MenuItem>
                        </Select>
                    </FormControl>                   
                </DialogContent>
                </Stack>
                <DialogActions>
                    <Button onClick={addTraining}>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}