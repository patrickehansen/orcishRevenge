'use strict';
import React from 'react';
import {withStyles} from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {styles} from './styles';

function Select(props) {
  const {classes} = props;

  return (
    <TextField
      id={props.id}
      select
      label={props.label}
      className={classes.textSelect}
      SelectProps={{
        MenuProps: {
          className: classes.menu,
        },
      }}
      value={props.value}
      onChange={(e) => {props.onChange(props.id, e)}}
      helperText={props.helperText}
      margin="normal"
      variant="outlined"
    >
    {props.options.map(option => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ))}
    </TextField>
  )
}

export default withStyles(styles)(Select)
