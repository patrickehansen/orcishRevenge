'use strict';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';

import ErrorComponent from '../util/error';
import ChatMessage from './chat/chatMessage';

class ChatRoll extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null,
      }
    }

    sendChat=(e) => {
      e.preventDefault();

      let message = e.target.elements.chatMessage.value;
      e.target.elements.chatMessage.value = '';

      console.log('message', message);
      this.props.onSendChat(message);
    }

    render() {
      return (
        <Container component='div' className='chatroll-root'>
          <div className='chatContainer'>
            {
              this.props.messages.map((v,i) => {
                return (
                  <ChatMessage message={v} key={i} />
                )
              })
            }
          </div>
          <form onSubmit={this.sendChat} className='chatInput'>
            <hr />
            <div className='chatInputGrid'>
              <input 
                type='text'
                name='chatMessage'
              />
              <button>Send</button>
            </div>
           
          </form>
          <ErrorComponent error={this.state.error} />
        </Container>
      )
    }
}

const mapStateToProps= (state) => {
  return {
    messages: state.chatMessages
  }
}

export default connect(mapStateToProps)(ChatRoll);