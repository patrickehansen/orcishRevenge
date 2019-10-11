'use strict';
import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import ErrorComponent from '../util/error';
import GameBoard from './board/gameBoard';

class Board extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null,
      }
    }

    logout=(e) => {
      e.preventDefault();

      this.props.onLogout();
    }

    render() {
      return (
        <Container component='div' className='board-root'>
          <button className='logoutBtn' onClick={this.logout}>
          Logout
          </button>
          <GameBoard />
          <ErrorComponent error={this.state.error} />
        </Container>
      )
    }
}

export default Board;