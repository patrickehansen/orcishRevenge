'use strict';
import React from 'react';
import {withStyles} from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import {styles} from './styles';

function NumberSelect(props) {
  const {classes} = props;

  return (
    
    <TextField
      id={props.id}
      type='number'
      label={props.label}
      className={classes.numberSelect}
      InputLabelProps={{
        shrink: true,
      }}
      value={props.value}
      inputProps={{
        step: props.step || 1,
      }}
      onChange={(e) => {props.onChange(props.id, e)}}
      helperText={props.helperText}
      margin='normal'
      variant='outlined'
    />
  )
}

export default withStyles(styles)(NumberSelect)
