import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: 16,
        minWidth: 120,
        width: "100%"
    }
}));


const SelectBox = (props) => {
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel>{props.label}</InputLabel>
            <Select
                required={props.required} value={props.value}
                onChange={(event) => props.select(event.target.value)}
            >
                {props.options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectBox;