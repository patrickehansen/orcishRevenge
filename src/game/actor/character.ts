import * as models from '../../models/character';
import { CharacterStats } from './components/characterStats';
import { Pawn } from './pawn';

export class Character extends Pawn {

  constructor(id, {stats, status, inventory}) {
    super(id, {stats, status, inventory});
  }
  
}