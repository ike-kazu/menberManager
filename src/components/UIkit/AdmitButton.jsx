import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/styles';

const useStyle = makeStyles({
    'button': {
        backgroundColor: '#4dd8e1',
        color: '#000',
        fontSize: 16,
        height: 48,
        marginBottom: 16,
        width: 128,
    }
})

const AdmitButton = (props) => {
    const classes = useStyle();
    return (
        <Button className={classes.button} variant='contained' onClick={() => props.onClick()}>
            {props.label}
        </Button>
    )
}

export default AdmitButton;