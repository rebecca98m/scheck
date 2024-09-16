import React, { useState, useEffect } from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";
import useProject from "../../Controller/Project/ProjectController";
import TextField from "@mui/material/TextField";
import {AlertTitle, Card, Divider, Fab, Grid2, List, ListItem, Stack, Typography} from "@mui/material";
import DoneIcon from "@mui/icons-material/DoneRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ReportCard from "../components/ReportCard";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CableRoundedIcon from '@mui/icons-material/CableRounded';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import HoverPopup from "../components/HoverPopup";
import ErrorAlert from "../components/ErrorAlert";
import BarChartProject from "../components/BarChartProject";
import ProjectRank from "../components/ProjectRank";
import {endLoad, startLoad} from "../../utils/utils";



const Reports = () => {
    const {project, getReportsFromProject, editProject, deleteProject, projectResult, getProjectResult } = useProject();
    const {id} = useParams();
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState(false);
    const navigate = useNavigate();
    const [openNew, setOpenNew] = useState('hidden')
    const [openAlert, setOpenAlert] = useState(false)

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

    function handleProjectResult() {
        startLoad();
        getProjectResult(id).then(
            (r) => {
                if (r.data.error === "Malformed projects" || r.data.error === "Malformed correlation") {
                    setOpenAlert(true);
                }
            }

        ).finally(endLoad);
    }

    useEffect(() => {
        getReportsFromProject(id);
    }, []);


    return (
        <>

            <ErrorAlert openStatus={openAlert}>
                <AlertTitle>Errori nei report:</AlertTitle>

                {
                    projectResult && projectResult.result && projectResult.result.malformedReport ?
                        projectResult.result.malformedReport.map(report => (
                            report.missing.length > 0 &&
                                <Typography variant="body1" key={report.id}>
                                    Nel report <Link to={'/reports/details/' + report.id} key={report.id}>{report.title}</Link>
                                    {
                                        report.missing.length > 1 ?
                                            " mancano i seguenti elementi:" : " manca il seguente elemento:"
                                    }
                                    <List>
                                        { report.missing.map(element => (
                                           <ListItem key={element.id}> {element.name} </ListItem>
                                        ))}
                                    </List>
                                </Typography>
                        ))

                        :
                        <></>
                }

                {
                    projectResult && projectResult.result && projectResult.result.malformedCorrelation &&
                        <Typography variant="body1">
                            I seguenti elementi hanno un diverso livello di correlazione nei report:
                            <List>
                                {
                                    projectResult.result.malformedCorrelation.map(element => (
                                        <ListItem key={element}> {element} </ListItem>
                                    ))
                                }
                            </List>
                        </Typography>
                }
            </ErrorAlert>

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
                                        <Fab sx={{mr: 1, zIndex: 1 }} size="small" color={"success"}
                                             onClick={() => handleProjectResult()}><CalculateRoundedIcon/></Fab>
                                        <Fab sx={{mr: 1, zIndex: 1 }} size="small" color={"warning"}
                                             onClick={() => handleEditTitle()}><EditIcon/></Fab>
                                        <Fab sx={{mr: 1, zIndex: 1 }} size="small" color={"error"}
                                             onClick={() => handleDeleteProject()}><DeleteIcon/></Fab>
                                    </div>

                                </>

                        }
                    </Stack>

                    {
                        projectResult && projectResult.result && projectResult.result.reports &&

                        <Stack
                            spacing={{ xs: 1, sm: 2 }}
                            direction="row"
                            useFlexGap
                            sx={{ margin:1, alignItems: "center", justifyContent:'space-between' }}
                        >
                            <Card sx={{margin:2, padding:2, textAlign:'center', width:700}}>
                                <Typography variant="h5">Impatto</Typography>
                                <BarChartProject reports={projectResult.result.reports} />
                            </Card>

                            <Card sx={{margin:2, padding:2, textAlign:'center', width:300}}>
                                <Typography variant="h5">Le alternative migliori</Typography>
                                <ProjectRank reports={projectResult.result.reports} />
                            </Card>
                        </Stack>

                    }


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
                        <Link className="button-right1" to={"/reports/new/" + project.result.id}>
                            <Fab color={"success"} size="small">
                                <HoverPopup textHover={"Crea nuovo report"} text={<EditRoundedIcon />}/>
                            </Fab>
                        </Link>
                        <Link className="button-right2" to={"/projects/details/" + project.result.id + "/connect"}>
                            <Fab color={"warning"} size="small">
                                <HoverPopup textHover={"Collega report esistente"} text={<CableRoundedIcon />}/>
                            </Fab></Link>
                    </div>
                </>
            }
        </>


    )
};

export default Reports;
