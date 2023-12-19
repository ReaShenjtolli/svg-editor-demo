import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button, FormControl, InputLabel, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

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
    position: 'relative', color: "#000000"
}

function EditModal({ setOpen, open, selectedElement }: ModalProps) {
    const handleClose = () => setOpen(false);

    console.log(selectedElement);

    return (
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
                    <Typography variant="h6" component="h4">
                        Edit SVG Element
                    </Typography>
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
                                        htmlFor='width'>Width</InputLabel>
                                    <TextField
                                        id='width'
                                        variant='outlined'
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
                                        htmlFor='X'>X</InputLabel>
                                    <TextField
                                        id='X'
                                        variant='outlined'
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
                                        htmlFor='Y'>Y</InputLabel>
                                    <TextField
                                        id='Y'
                                        variant='outlined'
                                        label=""
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
                                    >
                                        Add Event
                                    </Button>
                                </div>
                                <TextField></TextField>
                            </Grid>
                        </Grid>
                    </div>


                </Box>
            </Fade>
        </Modal>
    )
}

export default EditModal