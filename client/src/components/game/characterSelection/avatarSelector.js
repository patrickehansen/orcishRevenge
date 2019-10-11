'use strict';
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


class StatsAssigner extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.hideAvatar}
        TransitionComponent={Transition}
        keepMounted
      >
        <form onSubmit={this.props.submit}> 
          <DialogTitle>
            Select your Avatar
          </DialogTitle>
          <DialogContent>
          
          <DialogContentText>
            Paste a link to the avatar image you would like to use. At this time, only Imgur links are supported.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            name='avatarURL'
            ref={(ref) => this.textRef = ref}
            id='url'
            label='Imgur URL'
            type='url'
            fullWidth={true}
          />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.hideAvatar} color="primary">
              Cancel
            </Button>
            <Button type='submit' color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
        
      </Dialog>
    )
  }
}

export default StatsAssigner;