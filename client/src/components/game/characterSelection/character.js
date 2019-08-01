'use strict';
import React, { Component } from 'react';
import Container from '@material-ui/core/Container';

class Character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    }
  }
  
  render() {
    return (
      <Container component='div' className='board-root'>

      </Container>
    )
  }
}

export default Character;