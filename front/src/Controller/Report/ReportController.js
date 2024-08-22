import axios, {get} from "axios";
import {useState} from "react";
import {endLoad, startLoad} from "../../utils/utils";

const useReport = () => {
    const [reports, setReports] = useState(null);
    const [reportDetails, setReportDetails] = useState(null);
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
        axios.get("http://api.scheck.test/api/report/get/" + id, {
            withCredentials: true,
            withXSRFToken: true
        })
            .then(r => setReportDetails(r.data))
            .catch(err => console.error(err.message))
            .finally(endLoad);
    }

    return { reports, reportDetails, getAll, getReportDetails, newReport };
};

export default useReport;