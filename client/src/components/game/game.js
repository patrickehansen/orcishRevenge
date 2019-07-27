'use strict';
import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import SplitPane from 'react-split-pane';

import getChatHistory from '../../requests/chat/getChatHistory';
import Board from './board';
import ChatRoll from './chatroll';
import ErrorComponent from '../util/error';
import SocketClient from '../../socket/socketClient';

class Game extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null,
      }
    }

    componentDidMount() {
      console.log('Game component mounted. connecting to socket..')
      this.socketClient = new SocketClient({});

      getChatHistory()
    }

    onSendChat = (message) => {
      this.socketClient.SendChatMessage(message);
    }

    render() {
      console.log('hey here')
      return (
        <Container component='div' className='gameView-root'>
          <SplitPane 
            split='vertical' 
            minSize={220} 
            defaultSize={300} 
            maxSize={650} 
            primary='second'
            >
            <Board />
            <ChatRoll 
              onSendChat={this.onSendChat}
            />
          </SplitPane>
          <ErrorComponent error={this.state.error} />
        </Container>
      )
    }
}

export default Game;