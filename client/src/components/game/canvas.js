'use strict';
import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { Stage } from 'react-konva';

import ErrorComponent from '../util/error';

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    }
  }

  render() {
    return (
      <Container component='div' className='canvas-root'>
        <Stage 
          width={1700}
          height={980}
          drawBorder={true}
          />
        <ErrorComponent error={this.state.error} />
      </Container>
    )
  }
}

export default Canvas;