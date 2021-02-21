import { Engagement } from './engagement';

export class GameState { 
  // For now, only allow one engagement at a time.
  private _engagement: Engagement;

  constructor(saveData?) {

  }

  serialize() {

  }

  public get inCombat() {
    return !!this._engagement;
  }
}

// Round
// Round Start
// Round End -> Loops to the start of next round

// Players vs Mob (name tbd)




/**
 * Round is the entire round of combat, all actions taken
 * Period is the collection of rounds of one side of combat
 * Turn is one characters collection of actions taken
 * Action is something that is done during combat
 * 
 * Round START -> All action points reset
 * Period START
 * Turn START
 * Action
 * Action
 * Turn END -> Any turn-based effects ticked down
 * Turn START
 * Action -> Any turn-based effect applied
 * Action
 * Turn END
 * Period END
 * Period START
 * Turn START
 * Action
 * Action
 * Turn END
 * Period END
 * Period START
 * 
 * Effects are effective *immediately* upon being actioned.
 * Turn ticks down at the end of the affected character's next turn.
 * 
 * There comes to be a problem when:
 * 
 * Players take the first period of combat, and a player casts a time based effect such as Haste on a preceding player.
 * Thus providing AP retroactively, providing AP for an upcoming defense in the same round.
 * 
 * If we do decrement their remaining turns at the end of the round and they were not attacked, they lost a round of haste for nothing and were effectively "cheated"
 * If we do decrement their remaining turns at the end of the round and they are attacked, they were able to use the AP effectively.
 * If we do not decrement their remaining turns at the end of the round and they are attacked they got free AP, effectively "cheating"
 * If we do not decrement their remaining turns at the end of the round and they are not attacked they it is moot and has no impact.
 */
