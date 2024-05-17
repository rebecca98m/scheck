import { Outlet, Link } from "react-router-dom";
import logo from "../../img/logo/primary-logo.png";

const Layout = () => {
    return (
        <div className="App">
            <div id="load-screen" className="load-screen hidden">
                <span className="load-screen-img" />
            </div>
            <div className="page">
                <div className="header">
                    <img title="logo" src={logo} width={200} alt="scheck"/>
                </div>
                <div className="content">
                    <Outlet />
                </div>
            </div>

        </div>
    )
};

export default Layout;