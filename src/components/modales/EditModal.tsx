import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button, FormControl, InputLabel, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import TableEventList from "./TableEventList"
import React from 'react';
import AddEventModal from './AddEventModal';

type ModalProps = {
    setOpen: Function,
    open: boolean,
    selectedElement: HTMLElement | null,
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: "10px",
    boxShadow: 24,
    p: 1,
};

const textFieldStyle = {
    position: 'relative',
    color: "#000000"
}

const inputFieldStyle = {
    border: "1px solid #000",
    borderRadius: "5px"
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
                open={openAddEvents}
                setOpen={setOpenAddEvent}
                id={id}
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
                    <Box sx={style}>
                        <div className='flex justify-between items-center w-full'>
                            <Typography variant="h6" component="h4" className='font-bold'>
                                Edit SVG Element
                            </Typography>
                            <div style={{ width: "2rem", height: 'auto', cursor: "pointer" }} onClick={() => setOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24">
                                    <path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path>
                                </svg>
                            </div>
                        </div>
                        <div style={{ padding: "10px" }}>
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
                                        <Button variant="contained" className="bg-base-gray rounded-md" onClick={() => setOpenAddEvent(true)}>
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