import React, {useState} from "react";
import useProject from "../../Controller/Project/ProjectController";
import {useNavigate, useNavigation} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {Fab} from "@mui/material";
import DoneIcon from "@mui/icons-material/DoneRounded";


const NewProject = () => {
    const [input, setInput] = useState({
        title: ""
    })
    const { newProject } = useProject();
    const navigate = useNavigate();
    const handleSubmitEvent = () => {
        if(input.title !=="") {
            newProject(input).then(() => {
                navigate("/projects");
            })
            return;
        }
        alert("Inserisci un titolo valido");
    }

    const handleInput = (e) => {
        const {name, value} = e.target;
        setInput((prev)=> ({
            ...prev,
            [name]:value,
        }));
    };

    return (
        <form>
            <TextField
                id="title"
                name="title"
                label="Titolo"
                value={input.title}
                onChange={handleInput}
            />
            <Fab sx={{m: 1, zIndex: 1 }} size="small"
                 onClick={() => handleSubmitEvent()}><DoneIcon/></Fab>
        </form>
    );
};

export default NewProject;

