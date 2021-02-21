import { EventEmitter } from 'events';

export class Controller extends EventEmitter {
  protected _id: string;
  protected _type: string;

  constructor(id, type) {
    super();
    this._id = id;
    this._type = type;
  }

  public get id(): string {
    return this._id
  }

  public get type(): string {
    return this._type;
  }
}