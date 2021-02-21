import { Controller } from "../controller/controller";

export class Party {
  private _id: string;
  private _name: string;
  private _players: { [id: string] : Controller } = {};

  constructor(id, name) {
    this._id = id;
    this._name = name;
  }

  serialize() {

  }

  public addPlayer(player) {
    this._players[player.id] = player;
  }

  public removePlayer(id) {
    const controller = this._players[id];
    delete this._players[id];

    return controller;
  }

  public get players(): Array<Controller> {
    return Object.values(this._players);
  }
}