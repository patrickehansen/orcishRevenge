import { EventEmitter } from 'events';
import { Character } from './character'

export interface ControllerDictionary {
  [key: string]: {
    [id: string]: Controller,
  }
}

export declare class Controller extends EventEmitter {
  constructor();
  public get id(): string;
  public get type(): string;
}

export declare class PlayerController extends Controller {
  private _account: Account;
  private _character: Character; 

  constructor(id: string, account: Account);
  public possess(character: Character);
  public get character(): Character;
  public get account(): Account;
}