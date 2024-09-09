import {Fab, Slider, TableCell, TableRow, Typography} from "@mui/material";
import SelectElement from "./SelectElement";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import React, {useEffect, useState} from "react";
import DoneIcon from '@mui/icons-material/DoneRounded';
import useElement from "../../Controller/Element/ElementController";
import useElementValue from "../../Controller/Element/ElementValueController";
const EditElement = ({elements, reportId, onCreated, element}) => {
    const filter = createFilterOptions();
    const [input, setInput] = useState({
        magnitude: element?.magnitude ?? 5,
        correlation_level: element?.correlation_level ?? '1',
        element_id: element?.element_id ?? null,
        id : element?.id ?? null,
        report_id: reportId,
        element_name: element?.element.name ?? ""
    })
    const {newElementValue, editElementValue} = useElementValue();

    const getElementId = (selectValue) => {
        input.element_id = selectValue.id;
        input.element_name = selectValue.name;
    };

    function addElement() {
        if(input.element_id !== null && input.magnitude !== null && input.correlation_level !== null) {
            if (element === null) {
                newElementValue(input).then(() => {
                    onCreated();
                    setInput({
                        magnitude: 5,
                        correlation_level: '1',
                        element_id: null,
                        id : null,
                        report_id: reportId,
                        element_name: ""
                    });

                })
            }
            else {
                editElementValue(input).then(() => onCreated());
            }

        }
        else {
            alert("Compila tutti i campi");
        }

    }

    const handleInput = (e) => {
        const {name, value} = e.target;
        setInput((prev)=> ({
            ...prev,
            [name]:value,
        }));
    };
    return (
        <TableRow>
            <TableCell sx={{paddingBottom:2,paddingTop:2}}><SelectElement
                setParentId={getElementId}
                elements={elements ? elements : []}
                element={{id:input.element_id, name: input.element_name}}/>
            </TableCell>
            <TableCell colSpan={2}>
                <Typography variant="caption" color="grey" sx={{mt:10}}>Magnitudo</Typography>
                <Slider
                    aria-label="Magnitudo"
                    value={input.magnitude}
                    name="magnitude"
                    onChange={handleInput}
                    valueLabelDisplay="auto"
                    shiftStep={1}
                    step={1}
                    min={1}
                    max={10}
                />
            </TableCell>

            <TableCell align="center" colSpan={2}>
                <TextField

                    classes={{root: "text-center"}}
                    id="outlined-number"
                    align="center"
                    type="number"
                    label="Livello di correlazione"
                    onChange={handleInput}
                    name="correlation_level"
                    value={input.correlation_level}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />
            </TableCell>

            <TableCell align="center">
                <Fab onClick={addElement}><DoneIcon/></Fab>
            </TableCell>

        </TableRow>

    );
};
export default EditElement;
