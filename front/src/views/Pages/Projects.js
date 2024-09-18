import React, { useState, useEffect } from 'react'
import {Link} from "react-router-dom";
import useProject from "../../Controller/Project/ProjectController";
import {Fab, InputAdornment, Pagination, Stack, Typography} from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ProjectCard from "../components/ProjectCard";
import TextField from "@mui/material/TextField";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const Projects = () => {
    const {projects, getAllProjects} = useProject();

    const [itemsPerPage, setItemsPerPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState(null);

    useEffect(() => {
        if(itemsPerPage !== null) {
            getAllProjects(currentPage, itemsPerPage, searchText);
        }
    }, [currentPage, itemsPerPage, searchText]);

    useEffect(() => {
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            const reportCardWidth = 400;
            const reportCardHeight = 300;

            const itemsPerRow = Math.floor(width / reportCardWidth) -1;
            const itemsPerColumn = Math.floor(height / reportCardHeight) ;

            const newItemsPerPage = itemsPerRow * itemsPerColumn;

            setItemsPerPage(newItemsPerPage);
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);

        return () => {
            window.removeEventListener('resize', updateItemsPerPage);
        };
    }, []);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }


    return (
        <>
            <Stack direction={"row"} sx={{alignItems:'center', justifyContent:'space-between', mr:2, mt:2}}>
                <Typography variant="h2">Progetti salvati</Typography>
                <TextField
                    sx={{width:300}}
                    type="text"
                    id="search-text"
                    name="search-text"
                    label="Cerca"
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchRoundedIcon />
                            </InputAdornment>
                        ),
                    }}
                />

            </Stack>

            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap sx={{flexWrap: 'wrap', width:'100%', marginTop:2, marginBottom:1}}>

            {
                projects && projects.data && projects.data.length > 0 ?

                    projects.data.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))

                     :
                    <Stack sx={{minHeight:800, marginTop:10}}>
                        <Typography variant="h5">Nessun progetto da mostrare</Typography>
                    </Stack>
            }
            </Stack>
            {
                projects && projects.last_page > 1 &&
                <Pagination count={projects.last_page} onChange={(event, value) => {setCurrentPage(value)}} sx={{margin: 'auto',
                    marginTop: '1em'}} />
            }

            <Link className="button-right" to="/projects/new"><Fab color="primary"><AddRoundedIcon/></Fab></Link>
        </>
    )
};

export default Projects;
