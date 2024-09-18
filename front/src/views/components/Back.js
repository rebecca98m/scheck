import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from 'react-router-dom';

const Back = ({to}) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if(to) {
            navigate(to);
        }
        else {
            navigate(-1)
        }
    }

    return (
        <ArrowBackRoundedIcon sx={{mr:2, cursor: 'pointer'}} onClick={handleBack}/>
    );
};

export default Back;
