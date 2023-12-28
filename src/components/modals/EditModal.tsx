import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import TableEventList from "./TableEventList"
import AddEventModal from './AddEventModal';
import {
    Button,
    FormControl,
    InputLabel,
    TextField,
    Backdrop,
    Box,
    Modal,
    Typography,
    Fade
} from '@mui/material';
import { editSVGModalStyle, inputFieldStyle, textFieldStyle } from '../../assets/styles/modalsStyle';

type ModalProps = {
    setOpen: Function,
    open: boolean,
    selectedElement: HTMLElement | null,
}



function EditModal({ setOpen, open, selectedElement }: ModalProps) {

    const [openAddEvents, setOpenAddEvent] = React.useState<boolean>(false)

    const handleClose = () => setOpen(false);

    let id, inlineStyle
    let x, y, width, height

    if (selectedElement !== null) {
        const coordinates = selectedElement.getBoundingClientRect()

        x = coordinates.x
        y = coordinates.y
        width = coordinates.width
        height = coordinates.height

        inlineStyle = selectedElement.style.cssText
        id = selectedElement.getAttribute('id')

    }

    return (
        <React.Fragment>
            <AddEventModal
                header={"Add Events"}
                open={openAddEvents}
                setOpen={setOpenAddEvent}
                elementId={id}
                editEvents={{
                    id: '',
                    event_type: '',
                    event_action: ''
                }}
            />
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={editSVGModalStyle}>
                        <div className='flex justify-between items-center w-full'>
                            <Typography variant="h6" component="h4" className='font-bold'>
                                Edit SVG Element
                            </Typography>
                            <div className='close-button' onClick={() => setOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24">
                                    <path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="p-2.5">
                            <Grid container spacing={1}>
                                <Grid xs={12}>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel
                                            shrink
                                            sx={textFieldStyle}
                                            htmlFor="elementId"
                                        >
                                            Element ID
                                        </InputLabel>
                                        <TextField
                                            id="elementId"
                                            variant="outlined"
                                            value={id}
                                            sx={inputFieldStyle}
                                            label=""
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size='small'
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid xs={6}>
                                    <FormControl variant='standard'>
                                        <InputLabel
                                            shrink
                                            sx={textFieldStyle}
                                            htmlFor='height'>Height</InputLabel>
                                        <TextField
                                            id='height'
                                            variant='outlined'
                                            value={height}
                                            label=""
                                            sx={inputFieldStyle}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size='small'
                                        />
                                    </FormControl>

                                </Grid>
                                <Grid xs={6}>
                                    <FormControl variant='standard'>
                                        <InputLabel
                                            shrink
                                            sx={textFieldStyle}
                                            htmlFor='width'>Width</InputLabel>
                                        <TextField
                                            id='width'
                                            variant='outlined'
                                            value={width}
                                            label=""
                                            sx={inputFieldStyle}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size='small'
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid xs={6}>
                                    <FormControl variant='standard'>
                                        <InputLabel
                                            shrink
                                            sx={textFieldStyle}
                                            htmlFor='X'>X</InputLabel>
                                        <TextField
                                            id='X'
                                            value={x}
                                            variant='outlined'
                                            label=""
                                            sx={inputFieldStyle}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size='small'
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid xs={6}>
                                    <FormControl variant='standard'>
                                        <InputLabel
                                            shrink
                                            sx={textFieldStyle}
                                            htmlFor='Y'>Y</InputLabel>
                                        <TextField
                                            id='Y'
                                            variant='outlined'
                                            label=""
                                            sx={inputFieldStyle}
                                            value={y}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size='small'
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid xs={12}>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel
                                            shrink
                                            sx={textFieldStyle}
                                            htmlFor="style"
                                        >
                                            Style
                                        </InputLabel>
                                        <TextField
                                            id="style"
                                            variant="outlined"
                                            label=""
                                            sx={inputFieldStyle}
                                            value={inlineStyle}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size='small'
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid xs={12}>
                                    <div className="flex justify-between items-center w-full">
                                        <InputLabel sx={textFieldStyle}>Events</InputLabel>
                                        <Button
                                            variant="contained"
                                            className="bg-base-gray rounded-md"
                                            onClick={() => setOpenAddEvent(true)}
                                        >
                                            Add Event
                                        </Button>
                                    </div>
                                    <div className='mt-3'>
                                        <TableEventList elementId={id} />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </React.Fragment>
    )
}

export default EditModal