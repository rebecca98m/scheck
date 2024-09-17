import {useContext, createContext, useState, useEffect} from "react";
import {useNavigate, useNavigation} from "react-router-dom";
import axios, {get} from "axios";
import {endLoad, startLoad} from "../../utils/utils";

const AuthContext = createContext(1);

const AuthProvider = ({children}) => {
    const [logged, setLogged] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUserData();
    }, []);

    const loginAction = (data) => {
        startLoad();
        return axios.get('http://api.scheck.test/sanctum/csrf-cookie', {
            withCredentials: true,
            withXSRFToken: true
        })
            .then(response => {
                return axios.post("http://api.scheck.test/api/login", data, {
                    withCredentials: true,
                    withXSRFToken: true
                })
                    .then(loginData => {
                        setUser(loginData.data.result);
                        setLogged(true);
                        navigate("/");

                        return loginData;
                    });
            })
            .catch(err => {
                throw err;
            })
            .finally(endLoad);
    };

    const logOut = () => {
        axios.post("http://api.scheck.test/api/logout", {}, {
            withCredentials: true,
            withXSRFToken: true
        }).then(r => {
            setUser(null);
            setLogged(false);
            navigate("/login");
        });
    };

    const getUserData = () => {
        axios.get("http://api.scheck.test/api/me", {
            withCredentials: true,
            withXSRFToken: true
        })
            .then(loginData=> {
                if(loginData.data.result == null) {
                    setLogged(false);
                    return;
                }
                setUser(loginData.data.result);
                setLogged(true);
            })
            .catch(() => setUser(false));

        //TODO: gestire utente non loggato
    }

    return (
        <AuthContext.Provider value={{user, logged, loginAction, logOut, getUserData}}>
            {children}
        </AuthContext.Provider>
    );

};
export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};