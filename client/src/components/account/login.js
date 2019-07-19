'use strict';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {styles} from '../misc/styles';
import Fingerprint from '@material-ui/icons/Fingerprint';
import { withStyles} from '@material-ui/styles';
import { Collapse, Paper } from '@material-ui/core';

import auth from '../../requests/login';
import { setToken } from '../../store/actions/actions';
import store from '../../store/store';
import config from '../../../config';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
      redirecting: false,
    };
  }

  onError = (error) => {
    setTimeout(this.clearError, 5 * 1000)

    this.setState({
      error
    })
  }

  clearError = () => {
    this.setState({
      error: null
    })
  }

  loginSubmit = async e => {
    e.preventDefault();

    let user = e.target.elements.username.value;
    let pass = e.target.elements.password.value;

    if (!user || !pass) {
      this.onError('Please enter credentials..');
      return;
    }

    const response = await auth(user, pass).catch(error => {
      this.onError(error.message);
    });

    if (response && response.id_token) {
      let {id_token: token} = response;

      store.dispatch(setToken( token));
      localStorage.setItem(config.tokenIdentifier,token);

      this.setState({ redirecting: true });
    }
  };

  render() {
    const {classes} = this.props;

    if (this.state.redirecting) {
      return <Redirect to="/" />;
    }

    return (
      <Container component='div' className='loginView card'>
        <form className="loginForm" onSubmit={this.loginSubmit}>
          <Fingerprint />
          <Typography component="h1" variant="h5">
          Login
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                type="text"
                name="username"
                placeholder="Username"
                variant="filled"
                label="Username"
                autoFocus
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                type="password"
                name="password"
                placeholder="Password"
                variant="filled"
                label="Password"
                autoFocus
                required
              />
            </Grid>
            <Grid item xs={12}>
                <Button 
                  className={classes.submit}
                  variant='contained'
                  color='primary'
                  type="submit"
                  >
                  Submit
                </Button>
              </Grid>
          </Grid>
        </form>
        <Collapse in={!!this.state.error} >
          <Paper elevation={0} className='error'>
            {this.state.error}
          </Paper>
        </Collapse>
      </Container>
    );
  }
}

export default withStyles(styles)(Login);
