'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import SplitPane from 'react-split-pane';
import { Redirect } from 'react-router-dom';

import getChatHistory from '../../requests/chat/getChatHistory';
import getPlayers from '../../requests/game/getPlayers';
import getAccountDetails from '../../requests/account/getAccountInfo';

import {setCharacterInfo, setToken} from '../../store/actions/actions';

import config from '../../../config';

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

      if (!this.props.username) {
        getAccountDetails();
      }

      if (!this.props.token) {
        this.setState({loggedOut: true})
      }
    }

    onSendChat = (message) => {
      this.socketClient.SendChatMessage(message);
    }

    onLogout = () => {
      localStorage.removeItem(config.localstorageKey);
      setToken(null);
      setCharacterInfo(null);

      this.socketClient.disconnect();
      this.socketClient = null;

      this.setState({
        loggedOut: true,
      })
    }

    closeCharacterSelect = () => {
      //console.log('close character select')
      //this.forceUpdate();
      getPlayers();
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
          <CharacterSelect open={!this.props.possessedCharacter} close={this.closeCharacterSelect}/>
          <ErrorComponent error={this.state.error} />
        </Container>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    possessedCharacter: state.game.possessedCharacter,
    availableCharacters: state.account.availableCharacters,
    username: state.account.username,
    token: state.account.id_token,
  }
}

export default connect(mapStateToProps)(Game);