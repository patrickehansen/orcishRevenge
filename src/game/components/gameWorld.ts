import { EventEmitter } from 'events';
import { Character } from '../actor/character';
import { CharacterDictionary } from '../../models/character';

export class GameWorld extends EventEmitter {
  private _playerCharacters: CharacterDictionary = {};

  constructor() {
    super();
  }

  public getCharacters(): Array<Character> {
    return Object.values(this._playerCharacters);;
  }

  public addCharacter(character: Character, id: string) {
    this._playerCharacters[id] = character; 
  }
}