import {Link} from "react-router-dom";
import {useAuth} from "../../Controller/Login/AuthProvider";


const Menu = () => {
    const auth = useAuth();

    function handleLogout() {
        auth.logOut();
    }

    return (
        <nav className="horizontal-menu">
            <Link to="/">Home</Link>
            <Link to="reports">Reports</Link>
            <button onClick={handleLogout}>Log out</button>
        </nav>
    );
};

export default Menu;

