import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import {Divider} from "@mui/material";

const Layout = () => {
    return (
        <div className="App">
            <Spinner show={false}/>
            <div className="page">
                <Header/>
                <Divider orientation="vertical" flexItem />
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
};

export default Layout;