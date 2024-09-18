import React, {useState, useEffect} from 'react'
import {useParams} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import useReport from "../../Controller/Report/ReportController";
import useElement from "../../Controller/Element/ElementController";
import {
    Card,
    Fab,
    Paper, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,    Typography
} from "@mui/material";
import EditElement from "../components/EditElement";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useElementValue from "../../Controller/Element/ElementValueController";
import ImpactGauge from "../components/ImpactGauge";
import ImpactPieChart from "../components/ImpactPieChart";
import TextField from "@mui/material/TextField";
import DoneIcon from '@mui/icons-material/DoneRounded';
import useProject from "../../Controller/Project/ProjectController";
import Back from "../components/Back";

const Report = () => {
    const {reportDetails, getReportDetails, editReport, deleteReport} = useReport();
    const {projects, getAllProjects} = useProject()
    const {id} = useParams();
    const {deleteElementValue} = useElementValue();
    const {elements, getAll} = useElement();
    const [showingElements, setShowingElements] = useState(null);

    const [currentElement, setCurrentElement] = useState(null);
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState(false);
    const navigate = useNavigate();

    const handleInput = (e) => {
        const {name, value} = e.target;
        setInput((prev)=> ({
            ...prev,
            [name]:value,
        }));
    };

    function handleDeleteElementValue(elementId) {
        const data = {
            'id': elementId
        }
        deleteElementValue(data).then(() => getReportDetails(id));
    }

    function handleEditElementValue(value) {
        setCurrentElement(value.id);
    }

    function submitEditTitle() {
        const data = {
            'id' : id,
            'title': input.reporttitle
        };
        editReport(data).then(() => {
            getReportDetails(id);
            setEdit(false);
        });
    }

    function handleEditTitle() {
        setEdit(true);
    }

    function handleDeleteReport() {
        const data = {
            'id' : id
        };
        deleteReport(data).then(() => {
            navigate(-1);
        })
    }

    function onCreate() {
        getReportDetails(id);
        setCurrentElement(null);
    }

    useEffect(() => {
        getAll();
        getReportDetails(id);
    }, [id]);

    useEffect(() => {
        const reportElementValues = reportDetails?.result.element_values;
        const reportElementValuesIds = new Set(reportElementValues?.map(item => item.element_id));
        setShowingElements(elements?.filter(element => !reportElementValuesIds.has(element.id)));
    }, [elements, reportDetails]);

    return (
        <>
            {
                reportDetails && reportDetails.result ?
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
                                    id="reporttitle"
                                    name="reporttitle"
                                    label="Titolo"
                                    defaultValue={reportDetails.result.title}
                                    value={input.reporttitle}
                                    onChange={handleInput}
                                />
                                <Fab sx={{mr: 1, zIndex: 1 }} size="small"
                                     onClick={() => submitEditTitle()}><DoneIcon/></Fab>
                            </>

                        :
                                <Stack direction='row' sx={{alignItems:'center', justifyContent: 'space-between', width:'100%'}} className={"page-title"}>
                                    <Stack direction='row' sx={{alignItems:'center'}}>
                                        <Back />
                                        {
                                            reportDetails.result.project &&
                                            <Typography variant="h3" sx={{mr:2}}>{reportDetails.result.project.title} - </Typography>
                                        }

                                        <Typography variant="h3" sx={{mr:2}}>{reportDetails.result.title}</Typography>
                                    </Stack>

                                    <Stack direction='row'>
                                        <Fab sx={{mr: 1, zIndex: 1 }} size="small" color={"warning"}
                                             onClick={() => handleEditTitle()}><EditIcon/></Fab>
                                        <Fab sx={{mr: 1, zIndex: 1 }} size="small" color={"error"}
                                             onClick={() => handleDeleteReport()}><DeleteIcon/></Fab>
                                    </Stack>
                                </Stack>

                    }
                    </Stack>
                :
                "caricamento"
            }
            <Stack spacing={{ xs: 1, sm: 2 }}
                   direction="row"
                   useFlexGap
                   sx={{ margin:1, alignItems: "center", justifyContent:'space-between', flexWrap:'wrap' }}>
                {
                    reportDetails && reportDetails.result && reportDetails.result.element_values.length > 0 ?
                        <>
                            <Card sx={{margin:2, padding:2, textAlign:'center'}}>
                                <Typography variant="h6">Impatto</Typography>
                                <ImpactGauge impact={reportDetails.result.impact} minImpact={reportDetails.result.min_impact} maxImpact={reportDetails.result.max_impact} />
                            </Card>

                            <Card sx={{margin:2, paddingTop:2, textAlign:'center'}}>
                                <Typography variant="h6">Elementi di maggior impatto</Typography>
                                <ImpactPieChart reportDetails={reportDetails}/>
                            </Card>
                        </>

                        :
                        <></>
                }

                <TableContainer sx={{maxWidth: '95%', mb: 2, maxHeight: 800, paddingLeft:2, paddingRight:2, paddingTop:1, paddingBottom:1}} component={Paper}>
                    <Table size="small" stickyHeader aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{minWidth:50}}>Nome</TableCell>
                                <TableCell align="center">Magnitudo</TableCell>
                                <TableCell align="center">Livello di correlazione</TableCell>
                                <TableCell align="center">Valore di influenza</TableCell>
                                <TableCell align="center">Impatto elementare</TableCell>
                                <TableCell align="center" sx={{minWidth:100}}>Azioni</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                reportDetails && reportDetails.result && reportDetails.result.element_values.length > 0 ?


                                    reportDetails.result.element_values.map(value => (

                                        (currentElement && currentElement === value.id) ?
                                            <EditElement elements={showingElements}
                                                         key={value.id}
                                                         reportId={id}
                                                         onCreated={onCreate}
                                                         element={value}>
                                            </EditElement> :
                                            <TableRow
                                                key={value.id}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {value.element.name}
                                                </TableCell>
                                                <TableCell align="center">{value.magnitude}</TableCell>
                                                <TableCell align="center">{value.correlation_level}</TableCell>
                                                <TableCell align="center">{value.influence?.toFixed(2)}</TableCell>
                                                <TableCell align="center">{value.impact?.toFixed(2)}</TableCell>
                                                <TableCell align="center">
                                                    <Fab sx={{mr: 1, zIndex: 1 }} size="small" color={"warning"}
                                                         onClick={() => handleEditElementValue(value)}><EditIcon/></Fab>
                                                    <Fab sx={{mr: 1, zIndex: 1 }} size="small" color={"error"}
                                                         onClick={() => handleDeleteElementValue(value.id)}><DeleteIcon/></Fab>
                                                </TableCell>
                                            </TableRow>


                                    ))

                                    :
                                    <TableRow><TableCell colSpan={6} align="center" >Nessun valore da mostrare</TableCell></TableRow>
                            }
                            {
                                currentElement === null &&
                                <EditElement element={null} elements={showingElements} reportId={id}
                                             onCreated={() => getReportDetails(id)}></EditElement>
                            }



                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>


        </>
    )
};

export default Report;
