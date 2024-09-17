import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteDialog({open, setOpen, deleteProject, deleteProjectWithReports}) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Eliminazione progetto"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Attenzione, stai per eliminare un progetto. Desideri rimuovere anche gli eventuali report collegati ad esso o preferisci mantenerli?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteProjectWithReports}>Rimuovi anche i report collegati</Button>
                    <Button onClick={deleteProject} autoFocus>
                        Mantieni i report collegati
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}