'use strict';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import ListItem from '@material-ui/core/ListItem';
import moment from 'moment';

export default class EmoteMessage extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {Message, Sender, Sent} = this.props.message;

    return (
      <ListItem >
        <Card className='chatMessage emote'>
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              {<span className='sender'>{Sender + ' '}</span>}{Message.slice(4)}
            </Typography>
          </CardContent>
        </Card>
      </ListItem>
    )
  }
}
