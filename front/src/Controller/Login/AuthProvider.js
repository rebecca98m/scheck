import {useContext, createContext, useState, useEffect} from "react";
import {useNavigate, useNavigation} from "react-router-dom";
import axios, {get} from "axios";
import {endLoad, startLoad} from "../../utils/utils";
import {getApiUrl, getSanctumUrl} from "../../utils/api";

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
        return axios.get(getSanctumUrl('/sanctum/csrf-cookie'), {
            withCredentials: true,
            withXSRFToken: true
        })
            .then(response => {
                return axios.post(getApiUrl("/login"), data, {
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
        axios.post(getApiUrl("/logout"), {}, {
            withCredentials: true,
            withXSRFToken: true
        }).then(r => {
            setUser(null);
            setLogged(false);
            navigate("/login");
        });
    };

    const getUserData = () => {
        axios.get(getApiUrl("/me"), {
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

    const signup = (data) => {
        startLoad();
        return axios.get(getSanctumUrl('/sanctum/csrf-cookie'), {
            withCredentials: true,
            withXSRFToken: true
        })
            .then(response => {
                return axios.post(getApiUrl("/register"), data, {
                    withCredentials: true,
                    withXSRFToken: true
                })
                    .then(loginData => {
                        setUser(loginData.data.result);
                        setLogged(true);
                        navigate("/");

                        return loginData;
                    })
                    .catch(err => {
                        if (err.response && err.response.data && err.response.data.errors) {
                            throw err.response.data.errors;
                        }
                        throw err;
                    });
            })
            .catch(err => {
                throw err;
            })
            .finally(endLoad);
    };


    return (
        <AuthContext.Provider value={{user, logged, loginAction, logOut, getUserData, signup}}>
            {children}
        </AuthContext.Provider>
    );

};
export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};