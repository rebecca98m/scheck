import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from 'react-router-dom';

const Back = () => {
    const navigate = useNavigate();

    return (
        <ArrowBackRoundedIcon sx={{mr:2, cursor: 'pointer'}} onClick={() => navigate(-1)}/>
    );
};

export default Back;
