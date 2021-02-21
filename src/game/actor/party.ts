import { EventEmitter } from 'events';
import { Character } from '../../models/character';

export class Party extends EventEmitter {
  private _characters: {
    [key: string] : Character
  }
  constructor() {
    super();
  }

  public get characters(): Array<Character> {
    return Object.values(this._characters);
  }
}