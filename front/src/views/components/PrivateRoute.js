import React, {useState} from "react";
import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../../Controller/Login/AuthProvider";
import {endLoad, startLoad} from "../../utils/utils";
import Spinner from "./Spinner";

const PrivateRoute = () => {
    const {logged} = useAuth();
    if(logged === null) {
        return <Spinner show={true}/>
    }
    if (logged) {
        endLoad();
        return <Outlet />;
    }
    endLoad();
    return <Navigate to="/login" />;
};

export default PrivateRoute;