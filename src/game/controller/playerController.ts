import { Account } from '../../models/account';
import { Character } from '../../game/actor/character';
import { Controller } from './controller';

export class PlayerController extends Controller {
  private _account: Account;
  private _character: Character; 

  constructor(id: string, account: Account) {
    super(id, 'player');

    this._account = account;
  }

  public possess(character: Character) {
    this._character = character;
  }

  public get character(): Character {
    return this._character;
  }

  public get account(): Account {
    return this._account;
  }
}