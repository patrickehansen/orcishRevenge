import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';

export class World extends EventEmitter {
  private _id: string;
  private _levels;
  private _game;

  constructor(id, levels) {
    super();
    this._id = id || uuidv4();
    this._levels = levels;
  }

  public get levels() {
    return this._levels;
  }

  public set game(game) {
    this._game = game;
  }
}