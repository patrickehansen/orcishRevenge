import { EventEmitter } from 'events';
import { Position } from '../../models/actor';

export class Actor extends EventEmitter {
  private _id: string;

  private _rot: number;
  private _tile: any;

  private _blocks: boolean = false;
  private _hidden: boolean = false;
  private _icon: any; //hmmmmmmmmmm

  constructor(id: string) {
    super();

    this._id = id;
  }

  public get id(): string {
    return this._id;
  }

  protected tick() {
    
  }

  public serialize() {
    return {
      Uuid: this._id,
      Rotation: this._rot,
      Tile: this._tile.id,
      Icon: this._icon,
      Hidden: this._hidden,
    }
  }

  public deserialize() {

  }

  public get pos(): Position {
    return {
      ...this._tile.pos
    }
  }

  public get tile() {
    return this._tile;
  }

  public set tile(newTile) {
    this._tile = newTile;
    this.emit('moved', newTile);
  }

  public get rot() {
    return this._rot;
  }

  public set rot(rotation: number) {
    this._rot = rotation;
  }

  public getDistanceTo(other): number {
    return this._tile.distance(other);
  }

  public getDirectionTo(other) {
    const tileDir = this._tile.directionTo(other);
    
    //hmmmmmmmmm
    return tileDir + this._rot;
  }

  public getLevel() {
    return this._tile.level;
  }

  public get hidden() {
    return this._hidden;
  }

  public set hidden(hidden: boolean) {
    this._hidden = hidden;
    this.emit('hidden');
  }

  // What the hell is the data type of this???
  public get icon() {
    return this._icon;
  }

  public setIcon(icon) {
    this._icon = icon;
    this.emit('iconChanged', icon);
  }

  public get blocks() {
    return this._blocks;
  }

  public set blocks(blocks: boolean) {
    this._blocks = blocks;
  }

  public destroy() {
    this.emit('destroyed');
  }
}