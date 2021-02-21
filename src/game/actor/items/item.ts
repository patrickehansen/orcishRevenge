import { Actor } from "../actor";

export class Item {
  private _id: string;

  constructor() {}
  
  public get id() {
    return this._id;
  }

  public drop(): Actor {
    return null;
  }
}