import React, { useState, FormEvent } from 'react'
import Box from '@mui/material/Box';
import { Button, TextField, MenuItem, Checkbox } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

type AddEventsProps = {
    open: boolean,
    setOpen: Function,
    id: string | null | undefined,
    event_type: string,
    event_action: string
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


export default function AddEventModal({ open, setOpen, id, event_type, event_action }: AddEventsProps) {

    const handleClose = () => {
        setOpen(false)
        setEventAction(event_action)
        setEventType(event_type)
        setChecked(true)
        setError({ eventAction: false, eventType: false })
    };

    const [eventType, setEventType] = useState<string>(event_type);
    const [eventAction, setEventAction] = useState<string>(event_action);
    const [checked, setChecked] = React.useState<boolean>(true);
    const [error, setError] = useState({ eventType: false, eventAction: false })

    const handleEventText = `alert('Event triggered on element with ID: ${id}');`

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (eventType === "") {
            setError({ ...error, eventType: true })
        }

        if (eventAction === "") {
            setError({ ...error, eventAction: true })
        }

        if (id && !error.eventAction && !error.eventType) {
            const svgElement = document.getElementById(id);

            if (!svgElement) {
                alert('Element with specified ID not found!');
                return;
            }

            const handleEvent = (event: Event) => {
                const func = new Function('event', checked ? handleEventText : eventAction);
                func(event);
            };

            svgElement.addEventListener(eventType, handleEvent);

            handleClose()
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
                        <div className='close-button'
                            onClick={() => {
                                setOpen(false);
                            }}
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
                            label="Select Event Type"
                            select
                            value={eventType}
                            onChange={(e) => {
                                setEventType(e.target.value)
                                setError({ ...error, eventType: false })
                            }}
                            error={error.eventType ?? false}
                        >
                            <MenuItem value="click">onClick</MenuItem>
                            <MenuItem value="dblclick">onDubleClick</MenuItem>
                            <MenuItem value='mouseenter'>mouseEnter</MenuItem>
                        </TextField>

                        <div className='flex justify-between items-center ml-2'>
                            <div style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                                Use default Event Action.
                            </div>
                            <Checkbox
                                checked={checked}
                                onChange={() => setChecked((value: boolean) => !value)}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </div>

                        <TextField
                            id="eventAction"
                            label="Event Action"
                            variant='outlined'
                            inputProps={{
                                style: {
                                    fontFamily: 'monospace',
                                }

                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled={checked}
                            value={eventAction}
                            multiline
                            rows={5}
                            placeholder={handleEventText}
                            onChange={(e) => {
                                setEventAction(e.target.value)
                                setError({ ...error, eventAction: false })
                            }}
                            error={!checked && (error.eventAction ?? false)}
                        />
                    </div>
                    <Button
                        variant="contained"
                        className="bg-base-gray rounded-md m-2"
                        onClick={handleSubmit}
                    >
                        Apply Changes
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}