import axios, {get} from "axios";
import {useState} from "react";
import {endLoad, startLoad} from "../../utils/utils";
import {useNavigate} from "react-router-dom";

const useReport = () => {
    const [reports, setReports] = useState(null);
    const [reportDetails, setReportDetails] = useState(null);
    const navigate = useNavigate();
    const newReport = (data) => {
        return axios.post("http://api.scheck.test/api/report/new", data, {
            withCredentials: true,
            withXSRFToken: true
        }).catch(err => console.error(err.message));

    };

    const getAll = (page=0, count=9) => {
        startLoad();
        axios.get(`http://api.scheck.test/api/report/get?page=${page}&count=${count}`, {
            withCredentials: true,
            withXSRFToken: true
        })
            .then(r => setReports(r.data))
            .catch(err => console.error(err.message))
            .finally(endLoad);
    }

    const connect = (idReport, idProject) => {
        startLoad();
        const data = {
            'report_id': idReport,
            'project_id': idProject,
        }
        return axios.post("http://api.scheck.test/api/report/connect", data, {
            withCredentials: true,
            withXSRFToken: true
        })
            .then(r => setReports(r.data))
            .catch(err => console.error(err.message))
            .finally(endLoad);
    }

    const disconnect = (idReport, idProject) => {
        startLoad();
        const data = {
            'report_id': idReport,
            'project_id': idProject,
        }
        return axios.post("http://api.scheck.test/api/report/disconnect", data, {
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

    return { reports, reportDetails, getAll, connect, disconnect,getReportDetails, newReport, editReport, deleteReport };
};

export default useReport;