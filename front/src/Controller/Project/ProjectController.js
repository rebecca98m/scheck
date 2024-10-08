import axios from "axios";
import { useState } from "react";
import { endLoad, startLoad } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import {getApiUrl} from "../../utils/api";

const useProject = () => {
    const [projects, setProjects] = useState(null);
    const [project, setProject] = useState(null);
    const [lastProject, setLastProject] = useState(null);
    const [projectResult, setProjectResult] = useState(null);
    const [connectableReports, setConnectableReports] = useState(null);
    const navigate = useNavigate();

    const newProject = (data) => {
        return axios.post(getApiUrl("/project/new"), data, {
            withCredentials: true,
            withXSRFToken: true
        }).catch(err => console.error(err.message));
    };

    const getAllProjects = (page=1, count=9, text=null) => {
        startLoad();
        let url = text === null ?
            getApiUrl(`/project/get?page=${page}&count=${count}`) :
            getApiUrl(`/project/get?page=${page}&count=${count}&text=${text}`);
        axios.get(url, {
            withCredentials: true,
            withXSRFToken: true
        })
            .then(r => setProjects(r.data.result))
            .catch(err => console.error(err.message))
            .finally(() => endLoad());
    };

    const getLastProject = () => {
        startLoad();
        axios.get(getApiUrl(`/project/getlast`), {
            withCredentials: true,
            withXSRFToken: true
        })
            .then(r => setLastProject(r.data.result))
            .catch(err => console.error(err.message))
            .finally(endLoad);
    }

    const getReportsFromProject = (id, page=1, count=9, text=null) => {
        startLoad();
        let url = text === null ?
            getApiUrl(`/project/get/${id}?page=${page}&count=${count}`) :
            getApiUrl(`/project/get/${id}?page=${page}&count=${count}&text=${text}`);
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

    const getConnectableReports = (page=1, count=9, text=null) => {
        startLoad();
        let url = text === null ?
            getApiUrl(`/project/getConnectable?page=${page}&count=${count}`) :
            getApiUrl(`/project/getConnectable?page=${page}&count=${count}&text=${text}`);
        return axios.get(url, {
            withCredentials: true,
            withXSRFToken: true
        })
            .then(r => setConnectableReports(r.data.result))
            .catch(err => {
                console.error(err);
                navigate("/project");
            })
            .finally(() => endLoad());
    };

    const getProjectResult = (id) => {

        return axios.get(getApiUrl(`/project/getProjectResult/${id}`), {
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
        return axios.post(getApiUrl("/project/edit"), data, {
            withCredentials: true,
            withXSRFToken: true
        })
            .catch(err => console.error(err.message))
            .finally(() => endLoad());
    };

    const deleteProject = (data) => {
        startLoad();
        return axios.post(getApiUrl("/project/delete"), data, {
            withCredentials: true,
            withXSRFToken: true
        })
            .catch(err => console.error(err.message))
            .finally(() => endLoad());
    };

    const deleteProjectWithReports = (data) => {
        startLoad();
        return axios.post(getApiUrl("/project/deletereports"), data, {
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
        deleteProjectWithReports,
        projectResult,
        getProjectResult,
        lastProject,
        getLastProject
    };
};

export default useProject;
