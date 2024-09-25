import axios, {get} from "axios";
import {useState} from "react";
import {endLoad, startLoad} from "../../utils/utils";
import {getApiUrl} from "../../utils/api";

const useElement = () => {
    const [elements, setElements] = useState(null);

    const newElement = (data) => {
        startLoad();
        data = {
            name: data
        }
        const response = axios.post(getApiUrl("/element/new"), data, {
            withCredentials: true,
            withXSRFToken: true
        }).catch(err => console.error(err.message))
            .finally(endLoad);

        return response;

    };

    const getAll = () => {
        startLoad();
        axios.get(getApiUrl("/element/get"), {
            withCredentials: true,
            withXSRFToken: true
        })
            .then(r => setElements(r.data.result))
            .catch(err => console.error(err.message))
            .finally(endLoad);
    }


    return { elements, getAll, newElement };
};

export default useElement;