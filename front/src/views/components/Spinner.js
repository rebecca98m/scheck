import {Box, CircularProgress} from "@mui/material";

const Spinner = ({show}) => {
    return (
        <div id="load-screen" className= { show ? "load-screen" : "load-screen hidden"} >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '6em',
                height: '6em',
                marginTop: '-3em',
                marginLeft: '-3em',
                pointerEvents: 'none'}}>
                <CircularProgress size='4em'/>
            </Box>

        </div>
    )
};

export default Spinner;