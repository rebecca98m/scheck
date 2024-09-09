import axios, {get} from "axios";
import {useState} from "react";
import {endLoad, startLoad} from "../../utils/utils";

const useElementValue = () => {

    const newElementValue = (data) => {
        startLoad();
        const response = axios.post("http://api.scheck.test/api/elementvalue/new", data, {
            withCredentials: true,
            withXSRFToken: true
        }).catch(err => console.error(err.message))
            .finally(endLoad);

        return response;

    };

    const deleteElementValue = (data) => {
        startLoad();
        const response = axios.post("http://api.scheck.test/api/elementvalue/delete", data, {
            withCredentials: true,
            withXSRFToken: true
        }).catch(err => console.error(err.message))
            .finally(endLoad);

        return response;

    };

    const editElementValue = (data) => {
        startLoad();
        const response = axios.post("http://api.scheck.test/api/elementvalue/edit", data, {
            withCredentials: true,
            withXSRFToken: true
        }).catch(err => console.error(err.message))
            .finally(endLoad);

        return response;

    };


    return { newElementValue, deleteElementValue, editElementValue};
};

export default useElementValue;