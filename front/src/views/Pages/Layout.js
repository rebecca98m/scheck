import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";
import Spinner from "../components/Spinner";

const Layout = () => {
    return (
        <div className="App">
            <Spinner show={false}/>
            <div className="page">
                <Header/>
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
};

export default Layout;