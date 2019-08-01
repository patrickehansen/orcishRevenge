'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import SplitPane from 'react-split-pane';

import getChatHistory from '../../requests/chat/getChatHistory';
import Board from './board';
import CharacterSelect from './characterSelection/characterSelect';
import ChatRoll from './chatroll';
import ErrorComponent from '../util/error';
import SocketClient from '../../socket/socketClient';

class Game extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null,
        loggedOut: false,
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

    onLogout = () => {
      localStorage.removeItem(config.localstorageKey);
      store.dispatch(setToken(null));

      this.setState({
        loggedOut: true,
      })

      this.socketClient.disconnect();
      this.socketClient = null;
    }

    render() {
      if (this.state.loggedOut) {
        return <Redirect to='/' />
      }

      return (
        <Container component='div' className='gameView-root'>
          <SplitPane 
            split='vertical' 
            minSize={220} 
            defaultSize={300} 
            maxSize={650} 
            primary='second'
            >
            <Board 
              onLogout = {this.onLogout}
            />
            <ChatRoll 
              onSendChat={this.onSendChat}
            />
          </SplitPane>
          <CharacterSelect open={!this.props.possessedCharacter} />
          <ErrorComponent error={this.state.error} />
        </Container>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    possessedCharacter: state.possessedCharacter,
    availableCharacters: state.availableCharacters,
  }
}

export default connect(mapStateToProps)(Game);