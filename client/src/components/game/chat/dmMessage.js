'use strict';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

export default class DMMessage extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {Message, Sender, Sent} = this.props.message;

    const sentTime = moment(Sent).format('HH:mm:ss');

    return (
      <Card className='chatMessage dm'>
        <CardContent>
          <div className='header'>
            <span className='sender'>
            {Sender} says to you: 
            </span>
            <span className='time'>
              {sentTime}
            </span>
          </div>
          <hr />
          <Typography variant='body2' color='textSecondary' component='p'>
            {Message}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}
