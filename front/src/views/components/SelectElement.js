import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, {useEffect} from "react";
import useElement from "../../Controller/Element/ElementController";
const SelectElement = ({setParentId, elements, element}) => {
    const filter = createFilterOptions();
    const [value, setValue] = React.useState({id: element?.id, name: element?.name ?? ""});
    const {newElement} = useElement();

    useEffect(() => {
        if ( element ) {
            setValue( {id: element?.id, name: element?.name ?? ""} );
        }
    }, [element]);

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue({
                        name: newValue,
                    });
                    setParentId(newValue.id);
                } else if (newValue && newValue.inputValue) {

                    newElement(newValue.inputValue).then(
                        response => {
                            setValue({id: response.data.result.id, name:response.data.result.name});
                            setParentId({id: response.data.result.id, name: response.data.result.name});
                        });


                } else {
                    setValue(newValue);
                    setParentId({id: newValue.id, name: newValue.name});
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.name);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        name: `Aggiungi "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="select-element"
            options={elements}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.name;
            }}
            renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                    <li key={key} {...optionProps}>
                        {option.name}
                    </li>
                );
            }}
            sx={{ Width: 290 }}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label="Nome" />
            )}
        />
        )


}

export default SelectElement;