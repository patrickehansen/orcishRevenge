'use strict';
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Canvas from './canvas';
import ErrorComponent from '../util/error';
import store from '../../store/store';
import {setToken} from '../../store/actions/actions';
import config from '../../../config';

class Board extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null,
        loggedOut: false,
      }
    }

    logout=(e) => {
      e.preventDefault();

      localStorage.removeItem(config.localstorageKey);
      this.props.store.dispatch(setToken(null));

      this.setState({
        loggedOut: true,
      })
    }

    render() {
      if (this.state.loggedOut) {
        return <Redirect to='/' />
      }

      return (
        <Container component='div' className='board-root'>
          <button className='logoutBtn' onClick={this.logout}>
          Logout
          </button>
          <Canvas />
          <ErrorComponent error={this.state.error} />
        </Container>
      )
    }
}

export default Board;