import React, { Component } from "react";
import { RegularPolygon } from "react-konva";

const offsetConstant = 6.4641; // fucking magic. No idea where it comes from
const size = 15;

const w = size * 2;
const h = Math.sqrt(3) * size;

const stdXOffset = w;
const stdYOffset = h - 5;

export default class MapTile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fill: undefined,
      selected: false
    }
  }

  onClick= (e) => {

    this.setState({
      selected: !this.state.selected
    })
  }

  render() {
    const { x, y } = this.props.coords;

    const isOdd = x % 2 === 1;

    const calcX = stdXOffset + x * w * 0.75 * 2 + 0; // (isOdd ? 16  : 40);
    const calcY = stdYOffset + y * h * 2 + (isOdd ? h / offsetConstant : w); //

    return (
      <RegularPolygon
        x={calcX}
        y={calcY}
        sides={6}
        radius={w}
        fill={this.state.selected ? 'red': undefined}
        onClick={this.onClick}
        stroke={"black"}
        rotation={90}
        stroke={'rgba(0,0,0,0.25)'}
        strokeWidth={1}
      />
    );
  }
}
