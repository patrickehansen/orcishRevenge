const socketIO = require('socket.io');
const autoBind = require('auto-bind');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const dataManager = require('../data/dataManager');
const roller = require('../game/diceRoller');
const game = require('../game/game');
const config = require('../../config');

module.exports = class SocketServer {
  constructor (listener) {
    autoBind(this);

    if (listener) {
      // Under normal conditions, Hapi will provide the listener
      this.server = socketIO(listener);
    }else{
      // Under testing conditions, we need to listen ourselves
      this.server = socketIO.listen(5000); 
    }
    
    this.chat = this.server.of('/chat');

    this.connections = [];

    // The root namespace handler
    this.server.on('connection', this.handleConnection);

    // Chat namespace handler
    this.chat.on('connection', this.handleChatConnection);

    game.registerSocketServer(this);

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

      this.server.sockets.emit('chat', {
        Type: 'chat',
        Sent: moment(),
        Message: `${decoded.username} has joined the game.`
      });

    }catch(error) {
      console.error('Error in register client', error);
      client.disconnect();
    }
  }

  chatMessage(client, data) {
    console.log(`Chat message: ${data.message} from ${client.Username}`)

    let type;
    let message = data.message;

    let outgoing = {};

    if (data.message[0] === '/') {
      //command
      if (data.message.slice(0,4) === '/me ') {
        outgoing = {
          Sender: client.Username,
          Message: data.message,
          Sent: data.sent,
          Type: 'emote',
        }
      }else if (data.message.slice(0,6) === '/roll ') {
        const roll = roller.roll(data.message);
        outgoing = {
          Sender: client.Username,
          Roll: roll,
          Sent: data.sent,
          Type: 'roll',
        }
      }
    }else{
      outgoing = {
        Sender: client.Username,
        Message: data.message,
        Sent: data.sent,
        Type: 'chat',
      }
    }

    dataManager.AddChatHistory(outgoing);

    this.server.sockets.emit('chat', outgoing);
  }

  // onJoin(...args) {
  //   return;
  // }

  handleDisconnect(reason){
    //Disconnect
    console.log('disconnected', reason)

    const usernames = Object.values(this.server.sockets.connected).map(v => v.Username);
    const found = this.connections.find(v => !usernames.includes(v.Username));
    const username = found ? found.Username : 'Unknown user'

    this.server.sockets.emit('chat', {
      Type: 'chat',
      Sent: moment(),
      Message: `${username} has disconnected.`
    });

    console.log(`Socket: client disconnected: ${this.connections.length} sockets connected.`)
  }

  handleChatConnection(client) {
    console.log('chat disconnect')
  }

  addUser(user) {
    this.server.sockets.emit('addUser', user);
  }

  removeUser(user) {
    this.server.sockets.emit('removeUser', user);
  }
}