import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';


const PositiveError = (props) => {

  return (
    <Snackbar className='u-text-left' open={props.openError}>
      <Alert severity="success">
        <AlertTitle>{props.ErrorTitle}</AlertTitle>
        {props.ErrorSentence}<strong>{props.StrongErrorSentence}</strong>
      </Alert>
    </Snackbar>
  );
}

export default PositiveError;