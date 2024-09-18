import React, {useState} from "react";
import ReportController from "../../Controller/Report/ReportController";
import {Link, useNavigate, useNavigation, useParams} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {AlertTitle, Button, Fab, Stack, Typography} from "@mui/material";
import DoneIcon from "@mui/icons-material/DoneRounded";
import Back from "../components/Back";
import ErrorAlert from "../components/ErrorAlert";
import useProject from "../../Controller/Project/ProjectController";


const NewReport = () => {
    const [input, setInput] = useState({
        title: ""
    })
    const { newProject } = useProject();
    const navigate = useNavigate();
    const handleSubmitEvent = () => {
        if(input.title !=="") {
            newProject(input).then((r) => {
                navigate("/projects/details/" + r.data.result.id);
            })
            return;
        }
        setTextAlert("Inserisci un titolo valido");
        setOpenAlert(true);
    }

    const handleInput = (e) => {
        const {name, value} = e.target;
        setInput((prev)=> ({
            ...prev,
            [name]:value,
        }));
    };

    const [openAlert, setOpenAlert] = useState(false);
    const [textAlert, setTextAlert] = useState(null);

    return (
        <>

            <Stack>

                <Stack direction='row' sx={{alignItems:'center'}} className={"page-title"}>
                    <Back />
                    <Typography variant="h3" sx={{mr:2}}>Nuovo Progetto</Typography>
                </Stack>

                <Typography variant="h6">
                    In questa pagina puoi creare un nuovo progetto.
                </Typography>
                <Typography variant="h6">
                    Un progetto è una collezione di report.
                    Il calcolo del progetto fornirà un punteggio a ciascun report in base all'impatto che quest'ultimo genera, tramite il metodo AHP.
                </Typography>

                <ErrorAlert openAlert={openAlert} setOpenAlert={setOpenAlert}>
                    <AlertTitle>Errore:</AlertTitle>
                    <Typography variant="body1" >{textAlert}</Typography>
                </ErrorAlert>

                <Stack spacing={{ xs: 1, sm: 2 }} sx={{width:400, height:400, alignItems:'space-between', mt:10, alignSelf:'center'}}>
                    <TextField
                        id="title"
                        name="title"
                        label="Titolo"
                        value={input.title}
                        onChange={handleInput}
                    />
                    <Button className="button" sx={{selfAlign:'center'}} onClick={() => handleSubmitEvent()}>Crea progetto</Button>
                </Stack>





            </Stack>

        </>
    );
};

export default NewReport;

