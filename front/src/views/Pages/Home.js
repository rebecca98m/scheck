import { startLoad } from "../../utils/utils";
import { useAuth } from "../../Controller/Login/AuthProvider";
import {Link} from "react-router-dom";

const Home = () => {
    const user = useAuth().user;

    return (
        <div>
            Benvenuto {user ? user.name : ''}
            <button onClick={startLoad}>Premi</button>
        </div>
    );
};

export default Home;
