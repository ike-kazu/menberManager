import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/styles';

const useStyle = makeStyles({
    'button': {
        backgroundColor: '#FF3300',
        color: '#000',
        fontSize: 16,
        height: 48,
        marginBottom: 16,
        width: 128,
    }
})

const RefuseButton = (props) => {
    const classes = useStyle();
    return (
        <Button className={classes.button} variant='contained' width={props.width} onClick={() => props.onClick()}>
            {props.label}
        </Button>
    )
}

export default RefuseButton;
