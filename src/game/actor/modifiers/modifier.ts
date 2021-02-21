export class Modifier {
  protected _id: number;
  protected _modifies: any;

  protected remainingTurns: number;
  protected affects: string;

  constructor() {};

  public get id() {
    return this._id;
  }

  serialize() {
    return {
      id: this._id,
      remainingTurns: this.remainingTurns,
      affects: this.affects,
    }
  }

  onAttached(stats: any) {
    this._modifies = stats;
  }

  onTurnEnd() {
    if (this.remainingTurns > 0) {
      this.remainingTurns -= 1;
    }
  }
}