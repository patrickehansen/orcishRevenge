import { EventEmitter } from 'events';

export interface Points {
  current: number;
  total: number;
}

export interface Position {
  q: number;
  r: number;
}

export declare class Actor extends EventEmitter {

  constructor();

  public get id(): string;

  protected tick();

  public serialize();
  public deserialize();

  public get pos(): Position;

  public get tile();
  public set tile(newTile);

  public get rot();
  public set rot(rotation: number);

  public getDistanceTo(other);

  public getDirectionTo(other);

  public getLevel();

  public get hidden();
  public set hidden(hidden: boolean);

  // What the hell is the data type of this???
  public get icon();
  public set icon(icon);

  public get blocks();
  public set blocks(blocks);
  
  public destroy();
}