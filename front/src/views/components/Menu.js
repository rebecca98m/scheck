import {Link} from "react-router-dom";
import {useAuth} from "../../Controller/Login/AuthProvider";
import {Divider, MenuItem, MenuList} from "@mui/material";
import HomeIcon from '@mui/icons-material/HomeRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import TopicRoundedIcon from '@mui/icons-material/TopicRounded';


const Menu = () => {
    const auth = useAuth();

    function handleLogout() {
        auth.logOut();
    }

    return (
        <>
            <MenuList className="menu">
                <MenuItem>
                    <HomeIcon />
                    <Link to="/">Home</Link>
                </MenuItem>
                <MenuItem>
                    <AssessmentRoundedIcon />
                    <Link to="reports">Reports</Link>
                </MenuItem>
                <MenuItem>
                    <TopicRoundedIcon />
                    <Link to="projects">Progetti</Link>
                </MenuItem>
            </MenuList>

            <Divider variant="middle" flexItem sx={{mb:-25}}/>
            <MenuItem>

                <LogoutRoundedIcon />
                <span onClick={handleLogout}>Log out</span>
            </MenuItem>
        </>

    );
};

export default Menu;

