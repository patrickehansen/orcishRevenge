'use strict';
import React, {Component} from 'react';
import {Redirect, Link as RouterLink} from 'react-router-dom';
import {connect} from 'react-redux';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import {styles} from './misc/styles';
import { withStyles} from '@material-ui/styles';


class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;

    if (this.props.isAuthed) {
      return (<Redirect to={'/game'} />)
    }

    return (
      <Container component='div' className='homeView'> 
        <Typography component="h1" variant="h5">
          Orcish Revenge
        </Typography>
        <Container component='div' className='accountActions card'>
          <Link component={RouterLink} to='/register' className={classes.link}>Register</Link>
          <span> or </span>
          <Link component={RouterLink} to='/login'>Login</Link>
        </Container>
      </Container>
    )
  }
} 

const mapStateToProps = (state) => {
  return {
    isAuthed  : !!state.id_token
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Home));