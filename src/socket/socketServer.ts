import { EventEmitter } from 'events';
import socketIO from 'socket.io';
import autoBind from 'auto-bind';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import * as dataManager from '../data/dataManager'
//import dataManager from '../data/dataManager';
import * as roller from '../game/diceRoller';
import GameManager from '../game/gameManager';
import config from '../config';

export default class SocketServer extends EventEmitter {
  users: Array<any>;
  server: any;
  chat: any;
  connections: Array<any>;
  
  constructor (listener) {
    super();
    autoBind(this as any);

    this.users = [];

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

    GameManager.socketServer = this;

    console.log('Socket server listening..')
  }

  handleChatConnection(client) {
    console.log('chat connection!');
    
    client.on('disconnect', this.handleChatDisconnection)
  }

  handleSubscribe(client, data) {
    console.log('subscribe', data);

  }

  handleRoomMessage (client, data) {
    this.server.to(data.room).emit('roomMessage', data.message)
  }

  handleConnection(client){

    this.connections.push(client);
    console.log(`Socket: client connected: ${this.connections.length} sockets connected.`)
    client.on('disconnect', this.handleDisconnect);
    client.on('register', (data) => {this.registerClient(client, data)});
    client.on('chat', (data) => {this.chatMessage(client, data)});
    client.on('roll', (data) => {this.rollMessage(client, data)});
    client.on('room', (data) => {this.handleRoomMessage(client, data)});
  }

  registerClient(client, data){
    const room = client.handshake.address
    client.join(room);
    client.emit('roomInfo', room);
    this.server.to(room).emit('roomMessage', { type: 'join', data: data.id })

    if (!data.token) return;

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
    }
  }

  rollMessage(client, data) {
    console.log(`Roll message received:`, client.Username, data);
    const user = this.users.find(v => v.PlayerName === client.Username);

    if (!user) return;

    let result;
    if (data.type === 'stat') {
      result = roller.rollStat(data.roll, user ? user.Character : null);
    }else if (data.type === 'macro') {
      result = roller.rollMacro(data.roll, user ? user.Character : null);
    }

    const outgoing = {
      Sender: client.Username,
      Sent: data.sent,
      Roll: result,
      Type: 'roll',
    }
    
    dataManager.AddChatHistory(outgoing);
    this.server.sockets.emit('chat', outgoing);
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

    const usernames = Object.values(this.server.sockets.connected).map((v: any) => v.Username);
    const foundIndex = this.connections.findIndex(v => !usernames.includes(v.Username));
    const found = this.connections[foundIndex];

    if (found && found.Username) {
      this.server.sockets.emit('chat', {
        Type: 'chat',
        Sent: moment(),
        Message: `${found.Username} has disconnected.`
      });
    }

    this.connections.splice(foundIndex, 1);
    console.log(`Socket: client disconnected: ${this.connections.length} sockets connected.`)
  }

  handleChatDisconnection(client) {
    console.log('chat disconnect')
  }

  addUser(user) {
    this.users.push(user);
    this.server.sockets.emit('addUser', user);
  }

  removeUser(user) {
    this.users = this.users.filter(v => v.PlayerName !== user.PlayerName);

    this.server.sockets.emit('removeUser', user);
  }
}