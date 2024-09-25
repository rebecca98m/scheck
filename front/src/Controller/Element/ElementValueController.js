import axios, {get} from "axios";
import {useState} from "react";
import {endLoad, startLoad} from "../../utils/utils";
import {getApiUrl} from "../../utils/api";

const useElementValue = () => {

    const newElementValue = (data) => {
        startLoad();
        const response = axios.post(getApiUrl("/elementvalue/new"), data, {
            withCredentials: true,
            withXSRFToken: true
        }).catch(err => console.error(err.message))
            .finally(endLoad);

        return response;

    };

    const deleteElementValue = (data) => {
        startLoad();
        const response = axios.post(getApiUrl("/elementvalue/delete"), data, {
            withCredentials: true,
            withXSRFToken: true
        }).catch(err => console.error(err.message))
            .finally(endLoad);

        return response;

    };

    const editElementValue = (data) => {
        startLoad();
        const response = axios.post(getApiUrl("/elementvalue/edit"), data, {
            withCredentials: true,
            withXSRFToken: true
        }).catch(err => console.error(err.message))
            .finally(endLoad);

        return response;

    };


    return { newElementValue, deleteElementValue, editElementValue};
};

export default useElementValue;