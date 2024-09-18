import { useAuth } from "../../Controller/Login/AuthProvider";
import {Divider, Pagination, Stack, Typography} from "@mui/material";
import React, {useEffect} from "react";
import ReportCard from "../components/ReportCard";
import ProjectCard from "../components/ProjectCard";
import useReport from "../../Controller/Report/ReportController";
import useProject from "../../Controller/Project/ProjectController";
import {Link} from "react-router-dom";

const Home = () => {
    const user = useAuth().user;
    const {lastReport, getLastReport} = useReport();
    const {lastProject, getLastProject} = useProject();

    useEffect(() => {
        getLastReport();
        getLastProject();
    }, []);

    return (
        <>
            <Stack className={"page-title"}>
                <Typography variant="h3">Benvenuto {user ? user.name : ''}</Typography>
            </Stack>


            <Stack direction="row" sx={{ justifyContent: 'center', mt:10}}>

                <Stack direction="column" sx={{alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography variant="h4" sx={{ mt: 3, mb:2 }}>Ultimo report modificato</Typography>

                    {lastReport ? (
                        <ReportCard report={lastReport}></ReportCard>
                    ) : (
                        <Stack sx={{minHeight:800, marginTop:10}}>
                            <Typography variant="h5">Nessun report da mostrare</Typography>
                        </Stack>
                    )}
                    <Typography variant="body1" sx={{ mt: 2 }}><Link to={"/reports"}>Vai a tutti i report</Link></Typography>
                </Stack>

                <Divider variant="middle" orientation="vertical" sx={{m:8}} />

                <Stack direction="column" sx={{alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography variant="h4" sx={{ mt: 3, mb:2 }}>Ultimo progetto modificato</Typography>

                    {lastProject ? (
                        <ProjectCard project={lastProject}></ProjectCard>
                    ) : (
                        <Stack sx={{minHeight:800, marginTop:10}}>
                            <Typography variant="h5">Nessun progetto da mostrare</Typography>
                        </Stack>

                    )}
                    <Typography variant="body1" sx={{ mt: 2 }}><Link to={"/projects"}>Vai a tutti i progetti</Link></Typography>
                </Stack>
            </Stack>
        </>
    );
};

export default Home;
