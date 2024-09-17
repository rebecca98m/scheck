import axios from "axios";
import { useState } from "react";
import { endLoad, startLoad } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const useProject = () => {
    const [projects, setProjects] = useState(null);
    const [project, setProject] = useState(null);
    const [projectResult, setProjectResult] = useState(null);
    const [connectableReports, setConnectableReports] = useState(null);
    const navigate = useNavigate();

    const newProject = (data) => {
        return axios.post("http://api.scheck.test/api/project/new", data, {
            withCredentials: true,
            withXSRFToken: true
        }).catch(err => console.error(err.message));
    };

    const getAllProjects = (page=1, count=9, text=null) => {
        startLoad();
        let url = text === null ?
            `http://api.scheck.test/api/project/get?page=${page}&count=${count}` :
            `http://api.scheck.test/api/project/get?page=${page}&count=${count}&text=${text}`;
        axios.get(url, {
            withCredentials: true,
            withXSRFToken: true
        })
            .then(r => setProjects(r.data.result))
            .catch(err => console.error(err.message))
            .finally(() => endLoad());
    };

    const getReportsFromProject = (id, page=1, count=9, text=null) => {
        startLoad();
        let url = text === null ?
            `http://api.scheck.test/api/project/get/${id}?page=${page}&count=${count}` :
            `http://api.scheck.test/api/project/get/${id}?page=${page}&count=${count}&text=${text}`;
        return axios.get(url, {
            withCredentials: true,
            withXSRFToken: true
        })
            .then(r => setProject(r.data.result))
            .catch(err => {
                console.error(err);
            })
            .finally(() => endLoad());
    };

    const getConnectableReports = (page=1, count=9) => {
        startLoad();
        return axios.get(`http://api.scheck.test/api/project/getConnectable?page=${page}&count=${count}`, {
            withCredentials: true,
            withXSRFToken: true
        })
            .then(r => setConnectableReports(r.data))
            .catch(err => {
                console.error(err);
                navigate("/project");
            })
            .finally(() => endLoad());
    };

    const getProjectResult = (id) => {

        return axios.get(`http://api.scheck.test/api/project/getProjectResult/${id}`, {
            withCredentials: true,
            withXSRFToken: true
        })
            .then(r => {
                setProjectResult(r.data.result)
                return r;
            })
            .catch(err => {
                console.error(err);
            });
    }

    const editProject = (data) => {
        startLoad();
        return axios.post("http://api.scheck.test/api/project/edit", data, {
            withCredentials: true,
            withXSRFToken: true
        })
            .catch(err => console.error(err.message))
            .finally(() => endLoad());
    };

    const deleteProject = (data) => {
        startLoad();
        return axios.post("http://api.scheck.test/api/project/delete", data, {
            withCredentials: true,
            withXSRFToken: true
        })
            .catch(err => console.error(err.message))
            .finally(() => endLoad());
    };

    return {
        project,
        projects,
        getAllProjects,
        getConnectableReports,
        getReportsFromProject,
        connectableReports,
        newProject,
        editProject,
        deleteProject,
        projectResult,
        getProjectResult
    };
};

export default useProject;
