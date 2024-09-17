import React, {useState} from "react";
import {useAuth} from "../../Controller/Login/AuthProvider";
import {AlertTitle, Button, Fab, List, ListItem, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import TextField from "@mui/material/TextField";
import DoneIcon from "@mui/icons-material/DoneRounded";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        name: ""
    })
    const [openAlert, setOpenAlert] = useState(false);
    const [textAlert, setTextAlert] = useState(null);
    const auth = useAuth();
    const handleSubmitEvent = () => {
        if (input.email !== "" && input.password !== "" && input.name !== "") {
            auth.signup(input)
                .catch(errors => {
                    console.log(errors);
                    const errorMessage = Object.values(errors)
                        .flat()
                        .join("\n");
                    setTextAlert(errorMessage);
                    setOpenAlert(true);
                });
            return;
        }
        setTextAlert("Compilare tutti i campi");
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
        <Stack sx={{alignItems:'center', height: '90vh', textAlign:'center'}}>

            <Stack sx={{mb:5}}>
                <Typography variant="h3">Benvenuto</Typography>
                <Typography variant="h5">Compila il form per registrarti</Typography>
            </Stack>


            <ErrorAlert openAlert={openAlert} setOpenAlert={setOpenAlert}>
                <AlertTitle>Errore:</AlertTitle>
                <Typography variant="body1" >{textAlert}</Typography>
            </ErrorAlert>

            <Stack spacing={{ xs: 1, sm: 2 }} sx={{width:400, mt:10, alignItems:'space-between'}}>
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
                    type="name"
                    id="name"
                    name="name"
                    label="Nome"
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
                <TextField
                    required
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    label="Ripeti password"
                    onChange={handleInput}
                />
                <Button className="button" sx={{selfAlign:'center'}} onClick={() => handleSubmitEvent()}>Registrati</Button>

                <Typography variant="body1" sx={{textAlign:'center'}}>Hai già un account? <Link to={"/login"}>Accedi</Link></Typography>
            </Stack>


        </Stack>

    );
};

export default Login;

