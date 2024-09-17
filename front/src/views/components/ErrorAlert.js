import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import {useEffect} from "react";

export default function ErrorAlert({openAlert, setOpenAlert, children}) {

    return (
        <Box sx={{ textAlign:'start' }}>
            <Collapse in={openAlert}>
                <Alert severity="error" variant="filled"
                       action={
                           <IconButton
                               aria-label="close"
                               color="inherit"
                               size="small"
                               onClick={() => {
                                   setOpenAlert(false);
                               }}
                           >
                               <CloseIcon fontSize="inherit" />
                           </IconButton>
                       }
                       sx={{ mb: 2 }}
                >
                    {children}
                </Alert>
            </Collapse>
        </Box>
    );
}
