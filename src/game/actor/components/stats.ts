import { StatModifier } from '../modifiers/statModifier';

export class Stats {
  protected agi: number = NaN;
  protected end: number = NaN;
  protected str: number = NaN;

  protected int: number = NaN;
  protected spd: number = NaN;

  protected modifiers: Array<StatModifier>;

  constructor() {}

  serialize() {
    return {
      agi: this.agi,
      end: this.end,
      str: this.str,
      int: this.int,
      spd: this.spd,

      modifiers: this.modifiers.map(v => v.serialize()),
    }
  }
  
  public addModifier(modifier: StatModifier) {
    modifier.onAttached(this);
    
    this.modifiers.push(modifier);
  }

  public removeModifier(modifierId: number) {}

  public getStat(name: string): number {
    if (this[name]) return this[name];
    return NaN;
  }

  public setStat(name: string, value: number): void {
    if (!this[name] || typeof this[name] !== 'number') return;

    this[name] = value;
  }
}