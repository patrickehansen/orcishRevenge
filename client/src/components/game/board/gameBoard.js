'use strict';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';
import { Stage, Layer } from 'react-konva';

import MapTile from './mapTile';
import ErrorComponent from '../../util/error';



class GameBoard extends Component {
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
          width={2500}
          height={980}
          drawBorder={true}
        >
          <Layer>
            {this.props.tiles.map((v, i) => {
              return <MapTile tile={v} key={i} />;
            })}
          </Layer>
        </Stage>
        <ErrorComponent error={this.state.error} />
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tiles: state.map.tiles
  }
}

export default connect(mapStateToProps)(GameBoard);