import React, { useState, useEffect } from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";
import useProject from "../../Controller/Project/ProjectController";
import TextField from "@mui/material/TextField";
import {Fab, Grid2, Stack, Typography} from "@mui/material";
import DoneIcon from "@mui/icons-material/DoneRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ReportCard from "../components/ReportCard";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CableRoundedIcon from '@mui/icons-material/CableRounded';



const Reports = () => {
    const {project, getReportsFromProject, editProject, deleteProject} = useProject();
    const {id} = useParams();
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState(false);
    const navigate = useNavigate();
    const [openNew, setOpenNew] = useState('hidden')

    const handleInput = (e) => {
        const {name, value} = e.target;
        setInput((prev)=> ({
            ...prev,
            [name]:value,
        }));
    };

    function toggleNew() {
        if (openNew==='hidden') setOpenNew('');
        else setOpenNew('hidden');
    }
    function submitEditTitle() {
        const data = {
            'id' : id,
            'title': input.projecttitle
        };
        editProject(data).then(() => {
            getReportsFromProject(id);
            setEdit(false);
        });
    }

    function handleEditTitle() {
        setEdit(true);
    }

    function handleDeleteProject() {
        const data = {
            'id' : id
        };
        deleteProject(data).then(() => {
            navigate("/projects");
        })
    }

    useEffect(() => {
        getReportsFromProject(id);
    }, []);


    return (
        <>
            {
                project &&
                <>
                    <Stack
                        spacing={{ xs: 1, sm: 2 }}
                        direction="row"
                        useFlexGap
                        sx={{ margin:1, alignItems: "center", justifyContent:'space-between' }}
                    >
                        {
                            edit ?
                                <>
                                    <TextField
                                        required
                                        id="projecttitle"
                                        name="projecttitle"
                                        label="Titolo"
                                        defaultValue={project.result.title}
                                        value={input.projecttitle}
                                        onChange={handleInput}
                                    />
                                    <Fab sx={{mr: 1, zIndex: 1 }} size="small"
                                         onClick={() => submitEditTitle()}><DoneIcon/></Fab>
                                </>

                                :
                                <>
                                    <Typography variant="h3" sx={{mr:2}}>{project.result.title}</Typography>
                                    <div>
                                        <Fab sx={{mr: 1, zIndex: 1 }} size="small" color={"warning"}
                                             onClick={() => handleEditTitle()}><EditIcon/></Fab>
                                        <Fab sx={{mr: 1, zIndex: 1 }} size="small" color={"error"}
                                             onClick={() => handleDeleteProject()}><DeleteIcon/></Fab>
                                    </div>

                                </>

                        }
                    </Stack>
                    <Stack spacing={{ xs: 1, sm: 2 }} direction="column" useFlexGap>
                    {

                        project.result.reports && project.result.reports.length > 0 ?
                            project.result.reports.map(report => (
                            <ReportCard key={report.id} report={report}/>
                            ))

                             :
                            <p>Nessun report da mostrare</p>


                    }
                    </Stack>


                    <Fab className="button-right" color={"primary"} onClick={toggleNew}><AddRoundedIcon/></Fab>
                    <div className={openNew}>
                        <Link className="button-right1" to={"/reports/new/" + project.result.id}><Fab color={"success"} small><EditRoundedIcon /></Fab></Link>
                        <Link className="button-right2" to={"/projects/details/" + project.result.id + "/connect"}><Fab color={"warning"} small><CableRoundedIcon /></Fab></Link>
                    </div>
                </>
            }
        </>


    )
};

export default Reports;
