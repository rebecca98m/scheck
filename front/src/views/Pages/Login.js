import React, {useState} from "react";
import {useAuth} from "../../Controller/Login/AuthProvider";
import {AlertTitle, Button, Fab, List, ListItem, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import TextField from "@mui/material/TextField";
import DoneIcon from "@mui/icons-material/DoneRounded";

const Login = () => {
    const [input, setInput] = useState({
        username: "",
        password: "",
    })
    const [openAlert, setOpenAlert] = useState(false);
    const [textAlert, setTextAlert] = useState(null);
    const auth = useAuth();
    const handleSubmitEvent = (e) => {
        if ((input.mail !== "" || input.username !== "") && input.password !== "") {
            auth.loginAction(input)
                .catch(err => {
                    setTextAlert("Email o password non validi");
                    setOpenAlert(true);
                });
            return;
        }
        setTextAlert("Inserisci un nome utente e una password validi");
        setOpenAlert(true);
    };

    const handleInput = (e) => {
        const {name, value} = e.target;
        setInput((prev)=> ({
            ...prev,
            [name]:value,
        }));
    };

    return (
        <Stack sx={{alignItems:'center', justifyContent:'space-between', height: '90vh', textAlign:'center'}}>

            <Stack>
                <Typography variant="h3">Bentornato</Typography>
                <Typography variant="h5">Inserisci mail e password per continuare</Typography>
            </Stack>


            <ErrorAlert openAlert={openAlert} setOpenAlert={setOpenAlert}>
                <AlertTitle>Errore nel login:</AlertTitle>
                    <Typography variant="body1" >{textAlert}</Typography>
            </ErrorAlert>

            <Stack spacing={{ xs: 1, sm: 2 }} sx={{width:400, height:400, alignItems:'space-between'}}>
                <TextField
                    required
                    type="email"
                    id="user-email"
                    name="email"
                    label="Email"
                    onChange={handleInput}
                />

                <TextField
                    required
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    onChange={handleInput}
                />
                <Button className="button" sx={{selfAlign:'center'}} onClick={() => handleSubmitEvent()}>Accedi</Button>

                <Typography variant="body1" sx={{textAlign:'center'}}>Non hai ancora un account? <Link to={"/signup"}>Registrati</Link></Typography>
            </Stack>


        </Stack>

    );
};

export default Login;

