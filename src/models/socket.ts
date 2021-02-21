import { EventEmitter } from 'events';

export declare class SocketServer extends EventEmitter {
  constructor (listener);
  handleChatConnection(client);
  handleSubscribe(client, data);
  handleRoomMessage (client, data);
  handleConnection(client);
  registerClient(client, data);
  rollMessage(client, data);
  chatMessage(client, data);
  handleDisconnect(reason);
  handleChatDisconnection(client);
  addUser(user);
  removeUser(user);
}