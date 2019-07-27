'use strict';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Die from './die';
import moment from 'moment';

export default class RollMessage extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {Roll, Sender, Sent} = this.props.message;

    const sentTime = moment(Sent).format('HH:mm:ss');
    let {dice, sum, total, size, raw, operator, post} = Roll;

    return (
      <ListItem >
        <Card className='chatMessage rollMessage'>
          <CardContent>
            <div className='header'>
              <span className='sender'>
              {Sender} rolls: <span className='rawRoll'>{raw} </span>
              </span>
              <span className='time'>
                {sentTime}
              </span>
            </div>
            <hr />
            <div className='rollheader'>
              <div className='diceContainer'>
                {
                  dice.map((v, i) => {
                    return <Die roll={v} size={size} key={i}/>
                  })
                }
                <div className='rollOp'>
                  {operator}
                  {post}
                </div>
              </div>
              
            </div>
            <div className='rollResult'>
              {total}
            </div>
          </CardContent>
        </Card>
      </ListItem>
    )
  }
}
