'use strict';
import React, { Component } from 'react';
import {styles} from '../misc/styles';
import { withStyles} from '@material-ui/styles';
import { Collapse, Paper } from '@material-ui/core';

import config from '../../../config';

class ErrorComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
    };
  }

  onError = (error) => {
    setTimeout(this.clearError, config.errorClearTime)

    this.setState({
      error
    })
  }

  clearError = () => {
    this.setState({
      error: null
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if (prevProps.error !== this.props.error) {
      this.onError(this.props.error);
    }
  }

  render() {
    return (
      <Collapse in={!!this.state.error} >
        <Paper elevation={0} className='error'>
          {this.state.error}
        </Paper>
      </Collapse>
    );
  }
}

export default withStyles(styles)(ErrorComponent);
