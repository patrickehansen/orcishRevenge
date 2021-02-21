import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { Tile } from '../../models/world';

export class Hex extends EventEmitter {
  private _id: string;
  private _tile;

  constructor(id: string) {
    super();
    this._id = id || uuidv4();
  }

  public set tile(tile: Tile) {
    this._tile = tile;
  }
}