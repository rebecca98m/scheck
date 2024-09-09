import logo from "../../img/logo/primary-logo.png";
import Menu from "./Menu";
import {Link} from "react-router-dom";
import {useAuth} from "../../Controller/Login/AuthProvider";
import {Box, Paper} from "@mui/material";
const Header = () => {
    const user = useAuth().user;
    return (
        <div className="header">

            <img title="logo" src={logo} width={200} alt="scheck"/>
            {user ? <Menu/>  :  <Link to="login">Login</Link>}

        </div>
    )
};

export default Header;