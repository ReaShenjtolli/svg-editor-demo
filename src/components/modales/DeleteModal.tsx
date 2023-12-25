import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

type DeleteProps = {
    open: boolean,
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
    itemId: string
}

function DeleteModal({ open, onClose, onConfirm, itemName }: DeleteProps) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <div className='flex justify-between items-center w-full'>
                <DialogTitle>
                    Confirm Deletion
                </DialogTitle>
                <div className='close-button m-2.5' onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24">
                        <path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path>
                    </svg>
                </div>
            </div>

            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete {itemName}? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirm} color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteModal;