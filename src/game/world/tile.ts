import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { Hex, Level } from '../../models/world';
import { Actor } from "../../models/actor";

export class Tile extends EventEmitter {
  private _id: string;
  private _hex: Hex;
  private _level: Level;
  private _actors: {
    [id: string]: Actor
  }
  private _color: any; // hmmm
  private _blocked: boolean = false;

  constructor(id, hex, level) {
    super()
    this._id = id || uuidv4();
    
    this._hex = hex;
    this._level = level;
  }

  public get id() {
    return this._id;
  }

  public get hex() {
    return this._hex;
  }

  public get level() {
    return this._level;
  }

  public get blocked() {
    return this._blocked;
  }

  public set blocked(value: boolean) {
    this._blocked = value;
    if (value) this.emit('blocked')
    else this.emit('unblocked')
  }

  public get color() {
    return this._color;
  }

  public set color(newColor) {
    this._color = newColor;
  }
}