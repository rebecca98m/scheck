import axios, {get} from "axios";
import {useState} from "react";
import {endLoad, startLoad} from "../../utils/utils";
import {useNavigate} from "react-router-dom";

const useReport = () => {
    const [reports, setReports] = useState(null);
    const [reportDetails, setReportDetails] = useState(null);
    const navigate = useNavigate();
    const newReport = (data) => {
        axios.post("http://api.scheck.test/api/report/new", data, {
            withCredentials: true,
            withXSRFToken: true
        }).catch(err => console.error(err.message));

    };

    const getAll = () => {
        startLoad();
        axios.get("http://api.scheck.test/api/report/get", {
            withCredentials: true,
            withXSRFToken: true
        })
            .then(r => setReports(r.data))
            .catch(err => console.error(err.message))
            .finally(endLoad);
    }

    const getReportDetails = (id) => {
        startLoad();
        return axios.get("http://api.scheck.test/api/report/get/" + id, {
            withCredentials: true,
            withXSRFToken: true
        })
            .then(r => {
                setReportDetails(r.data);
            })
            .catch(err => {
                console.error(err)
                navigate("/reports");
                }
            )
            .finally(endLoad);
    }

    const editReport = (data) => {
        startLoad();
        return axios.post("http://api.scheck.test/api/report/edit", data, {
            withCredentials: true,
            withXSRFToken: true
        })
            .catch(err => console.error(err.message))
            .finally(endLoad);
    }

    const deleteReport = (data) => {
        startLoad();
        return axios.post("http://api.scheck.test/api/report/delete", data, {
            withCredentials: true,
            withXSRFToken: true
        })
            .catch(err => console.error(err.message))
            .finally(endLoad);
    }

    return { reports, reportDetails, getAll, getReportDetails, newReport, editReport, deleteReport };
};

export default useReport;