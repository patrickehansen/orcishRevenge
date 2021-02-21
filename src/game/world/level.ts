import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';

export class Level extends EventEmitter {
  private _tiles;
  private _world;

  constructor(world, tiles) {
    super();

    this._world = world;
    this._tiles = tiles;
  }
}