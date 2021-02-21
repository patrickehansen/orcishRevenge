import { EventEmitter } from 'events';

import { ControllerDictionary, Controller} from '../../models/controller';

export class Lobby extends EventEmitter {
  private _socketServer: any;
  private _controllers: ControllerDictionary = {
    players: {},
    gms: {},
    spectators: {},
  }

  constructor(saveData?) {
    super();
  }

  public set socketServer(server: any) {
    this._socketServer = server;
  }

  public getPlayers(): Array<Controller> {
    return Object.values(this._controllers.players);
  }

  public addUser(controller: Controller) {
    this[`_${controller.type}s`][controller.id] = controller;

    this.emit('userJoined', controller);
    // Notify the socket
    this._socketServer.addUser(controller);
  }

  public removeUser(controller: Controller) {
    this[`_${controller.type}s`][controller.id] = undefined;

    // Notify the socket
    this._socketServer.removeUser(controller);
  }
}