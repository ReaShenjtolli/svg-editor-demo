import React, { useState, useCallback, useEffect } from 'react'
import { addOrModifyEvents, receiveAllEventType } from '../../lib/localStorageEvents';
import {
    Button,
    TextField,
    MenuItem,
    Checkbox,
    Box,
    Modal,
    Typography
} from '@mui/material';
import { AddEventModalStyle } from '../../assets/styles/modalsStyle';

type AddEventsProps = {
    header: string
    open: boolean,
    setOpen: Function,
    elementId: string | null | undefined,
    editEvents: {
        id: string,
        event_type: string,
        event_action: string
    }
}


export default function AddEventModal({ header, open, setOpen, elementId, editEvents }: AddEventsProps) {

    const [eventType, setEventType] = useState(editEvents.event_type);
    const [eventAction, setEventAction] = useState(editEvents.event_action);
    const [checked, setChecked] = useState(editEvents.event_action === '' ? true : false);
    const [error, setError] = useState({ eventType: false, eventAction: false });

    useEffect(() => {
        setEventType(editEvents.event_type);
        setEventAction(editEvents.event_action);
        setChecked(editEvents.event_action === '' ? true : false);
    }, [editEvents]);

    const handleEventText = `alert('Event triggered on element with ID: ${elementId}');`;

    const handleClose = useCallback(() => {
        setOpen(false);
        setEventType(editEvents.event_type);
        setEventAction(editEvents.event_action);
        setChecked(true);
        setError({ eventType: false, eventAction: false });
    }, [setOpen, editEvents]);

    const validateAndSubmit = useCallback(() => {
        if (!eventType) {
            setError(prev => ({ ...prev, eventType: true }));
            return;
        }

        if (!eventAction && !checked) {
            setError(prev => ({ ...prev, eventAction: true }));
            return;
        }

        if (elementId) {
            const svgElement = document.getElementById(elementId);

            if (!svgElement) {
                alert('Element with specified ID not found!');
                return;
            }

            const handleEvent = (event: Event) => {
                const func = new Function('event', checked ? handleEventText : eventAction);
                func(event);
            };

            svgElement.addEventListener(eventType, handleEvent);

            const addNewEvent = {
                id: parseInt(editEvents.id),
                event_type: eventType,
                event_action: checked ? handleEventText : eventAction
            }

            addOrModifyEvents(elementId, addNewEvent)

            handleClose();
        }
    }, [eventType, eventAction, checked, elementId, handleClose]);

    const chosenEvents = elementId && receiveAllEventType(elementId)
    const isEventChosen = (eventType: string) => elementId ? chosenEvents.includes(eventType) : false


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={AddEventModalStyle}>

                    <div className='flex justify-between items-center w-full mb-2'>
                        <Typography variant="h6" component="h2" className='font-bold'>
                            {header}
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
                            defaultValue={elementId ?? elementId}
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
                            <MenuItem disabled={isEventChosen('click')} value="click">click</MenuItem>
                            <MenuItem disabled={isEventChosen('dblclick')} value="dblclick">dblclick</MenuItem>
                            <MenuItem disabled={isEventChosen('mouseenter')} value='mouseenter'>mouseenter</MenuItem>
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
                        onClick={validateAndSubmit}
                    >
                        Apply Changes
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}