import React, { useState, useEffect } from 'react'
import {Link} from "react-router-dom";
import useProject from "../../Controller/Project/ProjectController";
import {Fab, Stack, Typography} from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
    const {projects, getAllProjects} = useProject();

    useEffect(() => {
        getAllProjects();
    }, []);


    return (
        <>
            <Typography variant="h2">Progetti salvati</Typography>

            <Stack spacing={{ xs: 1, sm: 2 }} direction="column">

            {
                projects && projects.result && projects.result.length > 0 ?

                    projects.result.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))

                     :
                    <p>Nessun progetto da mostrare</p>
            }
            </Stack>

            <Link className="button-right" to="/projects/new"><Fab color="primary"><AddRoundedIcon/></Fab></Link>
        </>
    )
};

export default Projects;
