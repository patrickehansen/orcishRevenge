'use strict';
import React, { Component } from 'react';
import StatAdjuster from './statAdjuster';

class StatsAssigner extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id='statsAssignment'>
        <div id='statsTable'>
        {
          Object.entries(this.props.stats).map(([key, value]) => {
            return( 
              <StatAdjuster 
                name={key} 
                key={key}
                value={value} 
                increment={this.props.increment}
                decrement={this.props.decrement}
                canIncrement={this.props.remainingPoints > 0 && value < 20}
              />
            )
          })
        }
        </div>
        <div id='statsFooter'>
          <span id='remainingLabel'>Remaining: </span>
          <span id='remainingPoints'>{this.props.remainingPoints}</span>
        </div>
      </div>
    )
  }
}

export default StatsAssigner;