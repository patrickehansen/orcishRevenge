import { EventEmitter } from 'events';

export declare class GameWorld extends EventEmitter {
  
}

export declare class Level extends EventEmitter {

}

export declare class Tile extends EventEmitter {
  constructor(id: string, hex: Hex, level: Level);

  public get hex(): Hex;
  public get level(): Level;
  public get blocked(): boolean;
  public set blocked(value: boolean);
}

export declare class Hex extends EventEmitter {
  constructor(id: string);
  public set tile(tile: Tile);
}