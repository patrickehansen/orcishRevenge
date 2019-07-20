'use strict';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

class ChatMessage extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {Message, Sender, Sent} = this.props.message;

    console.log('here is props message', this.props.message, Sender, Sent)

    const sentTime = moment(Sent).format('HH:mm:ss');

    return (
      <Card className='chatMessage'>
        <CardContent>
          <div className='header'>
            <span className='sender'>
            {Sender}
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

// </Typography>
// <Typography variant='body2' color='textSecondary' component='p'>
// <Typography variant='body2' color='textSecondary' component='p'></Typography>
// </Typography>
export default ChatMessage;