const socketIO = require('socket.io');
const autoBind = require('auto-bind');
const jwt = require('jsonwebtoken');

const config = require('../../config');

module.exports = class SocketServer {
  constructor (listener) {
    autoBind(this);

    this.server = socketIO(listener);
    this.chat = this.server.of('/chat');

    this.connections = [];

    // The root namespace handler
    this.server.on('connection', this.handleConnection);

    // Chat namespace handler
    this.chat.on('connection', this.handleChatConnection);

    console.log('Socket server listening..')
  }

  handleChatConnection(client) {
    console.log('chat connection!');

    client.on('disconnect', this.handleChatDisconnection)
  }
  
  handleConnection(client){
    this.connections.push(client);
    console.log(`Socket: client connected: ${this.connections.length} sockets connected.`)
    client.on('disconnect', this.handleDisconnect);
    client.on('register', (data) => {this.registerClient(client, data)});
    client.on('chat', (data) => {this.chatMessage(client, data)})
  }

  registerClient(client, data){
    try {
      let decoded = jwt.verify(data.token, config.secret);
      if (!decoded) {
        client.disconnect();
      }
  
      client.Username = decoded.username;
      console.log(`User ${decoded.username} registered.`);

    }catch(error) {
      console.error('Error in register client', error);
      client.disconnect();
    }
  }

  chatMessage(client, data) {
    console.log(`Chat message: ${data.message} from ${client.Username}`)
    const built = {
      Sender: client.Username,
      Message: data.message,
      Sent: data.sent,
    }

    this.server.sockets.emit('chat', built);
  }

  // onJoin(...args) {
  //   return;
  // }

  handleDisconnect(client){
    //Disconnect
    this.connections.splice(this.connections.indexOf(client));
    console.log(`Socket: client disconnected: ${this.connections.length} sockets connected.`)
  }

  handleChatConnection(client) {
    console.log('chat disconnect')
  }
}