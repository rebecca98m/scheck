import React, { useState, useEffect } from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";
import useProject from "../../Controller/Project/ProjectController";
import TextField from "@mui/material/TextField";
import {
    AlertTitle,
    Card,
    Divider,
    Fab,
    Grid2,
    InputAdornment,
    List,
    ListItem,
    Pagination,
    Stack,
    Typography
} from "@mui/material";
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
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TwoActionsDialog from "../components/TwoActionsDialog";

const Reports = () => {
    const {project, getReportsFromProject, editProject, deleteProject, deleteProjectWithReports, projectResult, getProjectResult } = useProject();
    const {id} = useParams();
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState(false);
    const navigate = useNavigate();
    const [openNew, setOpenNew] = useState('hidden')
    const [openAlert, setOpenAlert] = useState(false)
    const [itemsPerPage, setItemsPerPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openNewReportDialog, setOpenNewReportDialog] = useState(false);

    useEffect(() => {

        if(itemsPerPage !== null) {
            getReportsFromProject(id, currentPage, itemsPerPage, searchText);
        }

    }, [currentPage, itemsPerPage, searchText]);

    useEffect(() => {
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            const reportCardWidth = 300;
            const reportCardHeight = 200;

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

    const handleInput = (e) => {
        const {name, value} = e.target;
        setInput((prev)=> ({
            ...prev,
            [name]:value,
        }));
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }
    function submitEditTitle() {
        const data = {
            'id' : id,
            'title': input.projecttitle
        };
        editProject(data).then(() => {
            getReportsFromProject(id,currentPage, itemsPerPage);
            setEdit(false);
        });
    }

    function handleEditTitle() {
        setEdit(true);
    }

    function handleDeleteDialog() {
        setOpenDeleteDialog(true);
    }
    function handleNewReportDialog() {
        setOpenNewReportDialog(true);
    }

    function goToNewReport() {
        navigate("/reports/new/" + id);
    }

    function goToConnect() {
        navigate("/projects/details/" + id + "/connect");
    }

    function handleDeleteProject() {
        const data = {
            'id' : id
        };
        deleteProject(data).then(() => {
            navigate("/projects");
        })
    }

    function handleDeleteProjectWithReports() {
        const data = {
            'id' : id
        };
        deleteProjectWithReports(data).then(() => {
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

    return (
        <>
            <TwoActionsDialog
                open={openDeleteDialog}
                setOpen={setOpenDeleteDialog}
                title={"Elimina progetto"}
                description={"Attenzione, stai per eliminare un progetto. Desideri rimuovere anche gli eventuali report collegati ad esso o preferisci mantenerli?"}
                action1={{
                    action: handleDeleteProject,
                    text: "Mantieni i report collegati"
                }}
                action2={{
                    action: handleDeleteProjectWithReports,
                    text: "Rimuovi anche i report collegati"
                }}
            />

            <TwoActionsDialog
                open={openNewReportDialog}
                setOpen={setOpenNewReportDialog}
                title={"Aggiungi report"}
                description={"Desideri creare un nuovo report o collegare al progetto un report esistente?"}
                action1={{
                    action: goToNewReport,
                    text: "Crea un nuovo report"
                }}
                action2={{
                    action: goToConnect,
                    text: "Collega un report esistente"
                }}
            />

            <ErrorAlert openAlert={openAlert} setOpenAlert={setOpenAlert}>
                <AlertTitle>Errori nei report:</AlertTitle>

                {
                    projectResult && projectResult.malformedReport ?
                        projectResult.malformedReport.map(report => (
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
                    projectResult && projectResult.malformedCorrelation &&
                        <Typography variant="body1">
                            I seguenti elementi hanno un diverso livello di correlazione nei report:
                            <List>
                                {
                                    projectResult.malformedCorrelation.map(element => (
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
                                        defaultValue={project.title}
                                        value={input.projecttitle}
                                        onChange={handleInput}
                                    />
                                    <Fab sx={{mr: 1, zIndex: 1 }} size="small"
                                         onClick={() => submitEditTitle()}><DoneIcon/></Fab>
                                </>

                                :
                                <>
                                    <Typography variant="h3" sx={{mr:2}}>{project.title}</Typography>
                                    <div>
                                        <Fab sx={{mr: 1, zIndex: 1 }} size="small" color={"success"}
                                             onClick={() => handleProjectResult()}><CalculateRoundedIcon/></Fab>
                                        <Fab sx={{mr: 1, zIndex: 1 }} size="small" color={"warning"}
                                             onClick={() => handleEditTitle()}><EditIcon/></Fab>
                                        <Fab sx={{mr: 1, zIndex: 1 }} size="small" color={"error"}
                                             onClick={() => handleDeleteDialog()}><DeleteIcon/></Fab>
                                    </div>

                                </>

                        }
                    </Stack>

                    {
                        projectResult && projectResult.reports &&

                        <Stack
                            spacing={{ xs: 1, sm: 2 }}
                            direction="row"
                            useFlexGap
                            sx={{ margin:1, alignItems: "center", justifyContent:'space-between' }}
                        >
                            <Card sx={{margin:2, padding:2, textAlign:'center', width:700}}>
                                <Typography variant="h5">Impatto</Typography>
                                <BarChartProject reports={projectResult.reports} />
                            </Card>

                            <Card sx={{margin:2, padding:2, textAlign:'center', width:300}}>
                                <Typography variant="h5">Le alternative migliori</Typography>
                                <ProjectRank reports={projectResult.reports} />
                            </Card>
                        </Stack>

                    }


                    <Stack direction={"row"} sx={{alignItems:'center', justifyContent:'space-between', mr:2, mt:2}}>
                        <Typography variant="h4">Report collegati</Typography>
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

                        project.reports.data && project.reports.data.length > 0 ?
                            project.reports.data.map(report => (
                            <ReportCard key={report.id} report={report}/>
                            ))

                             :
                            <Stack sx={{minHeight:800, marginTop:10}}>
                                <Typography variant="h5">Nessun report da mostrare</Typography>
                            </Stack>


                    }
                    </Stack>

                    {
                        project && project.reports.last_page > 1 &&
                        <Pagination count={project.reports.last_page} onChange={(event, value) => {setCurrentPage(value)}} sx={{margin: 'auto',
                            marginTop: '1em'}} />
                    }


                    <Fab className="button-right" color={"primary"} onClick={handleNewReportDialog}><AddRoundedIcon/></Fab>
                </>
            }
        </>


    )
};

export default Reports;
