import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Button, TextField, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

type AddEventsProps = {
    open: boolean,
    setOpen: Function,
    id: string | null | undefined,
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    width: 500,
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    '& .MuiTextField-root': { m: 1, width: '100%' },
};


export default function AddEventModal({ open, setOpen, id }: AddEventsProps) {

    const handleClose = () => setOpen(false);

    const [eventType, setEventType] = useState('');
    const [eventAction, setEventAction] = useState('');

    const handleEvent = () => {
        alert(`Event triggered on element with ID: ${id}, with event type: ${eventType}`);
    };

    const handleSubmit = () => {

        if (id) {
            const svgElement = document.getElementById(id);

            if (!svgElement) {
                alert('Element with specified ID not found!');
                return;
            }

            svgElement.addEventListener(eventType, handleEvent);

        }

    }


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>

                    <div className='flex justify-between items-center w-full'>
                        <Typography variant="h6" component="h2" className='font-bold'>
                            Add Events
                        </Typography>
                        <div style={{ width: "2rem", height: 'auto', cursor: "pointer" }} onClick={() => {setOpen(false); }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24">
                                <path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path>
                            </svg>
                        </div>
                    </div>

                    <div>
                        <TextField
                            id="elementId"
                            label="Element Id"
                            disabled
                            defaultValue={id ?? id}
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                        <TextField
                            id="eventType"
                            select
                            label="Select Event Type"
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                        >
                            <MenuItem value="click">onClick</MenuItem>
                            <MenuItem value="dblclick">onDubleClick</MenuItem>
                        </TextField>

                        <TextField
                            id="eventAction"
                            label="Event Action"
                            variant="outlined"
                            value={eventAction}
                            onChange={(e) => setEventAction(e.target.value)}

                        />
                    </div>
                    <Button variant="contained" className="bg-base-gray rounded-md m-2" onClick={() => handleSubmit()}>
                        Apply Changes
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}