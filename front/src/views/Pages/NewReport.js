import React, {useState} from "react";
import ReportController from "../../Controller/Report/ReportController";
import {Link, useNavigate, useNavigation, useParams} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {AlertTitle, Button, Fab, Stack, Typography} from "@mui/material";
import DoneIcon from "@mui/icons-material/DoneRounded";
import Back from "../components/Back";
import ErrorAlert from "../components/ErrorAlert";


const NewReport = () => {
    const [input, setInput] = useState({
        title: ""
    })
    const { newReport } = ReportController();
    const navigate = useNavigate();
    const {projectid} = useParams();
    const handleSubmitEvent = () => {
        input.project_id = projectid;
        if(input.title !=="") {
            newReport(input).then((r) => {
                navigate("/reports/details/" + r.data.result.id);
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
                    <Typography variant="h3" sx={{mr:2}}>Nuovo Report</Typography>
                </Stack>

                <Typography variant="h6">
                    In questa pagina puoi creare un nuovo report.
                </Typography>
                <Typography variant="h6">
                    Un report è un documento che raccoglie e analizza dati specifici relativi a un opera in un determinato ambiente.
                    L'impatto del report verrà calcolato tramite il metodo Battelle, che valuta l'effetto delle variabili su criteri chiave.
                </Typography>
                {
                    projectid ?
                        <Typography variant="h6" sx={{mb:2}}>
                            Questo report verrà aggiunto al progetto [TITOLO PROGETTO].
                        </Typography>
                        :
                        <Typography variant="h6" sx={{mb:2}}>
                            Questo report potrà essere collegato a un progetto.
                        </Typography>

                }


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
                    <Button className="button" sx={{selfAlign:'center'}} onClick={() => handleSubmitEvent()}>Crea report</Button>
                </Stack>





            </Stack>

        </>
    );
};

export default NewReport;

