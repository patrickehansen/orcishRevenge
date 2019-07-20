import socketIO from 'socket.io-client';
import moment from 'moment';
import config from '../../config';
import store from '../store/store';
import {addChatMessage} from '../store/actions/actions';


class SocketClient {
  constructor(options) {
    const socket = socketIO(options.socketAddress || config.server)
    this.socket = socket;
    
    socket.on('connect', this.onConnect);
    socket.on('disconnect', this.onDisconnect);
    socket.on('chat', this.handleChatMessage);
  }

  onConnect = () => {
    console.log('Socket connection established.')
    const idToken = store.getState().id_token;
    this.socket.emit('register', {
      token: idToken
    })
  }

  onDisconnect = (reason) => {
    console.log(`Socket disconnected! ${reason}`);
  }

  handleChatMessage = (data) => {
    console.log('received a chat message', data);
    store.dispatch(addChatMessage(data))
  }

  SendChatMessage = (message) => {
    this.socket.emit('chat', {
      message,
      sent: moment()
    })
  }
}

export default SocketClient;