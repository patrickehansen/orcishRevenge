import { Stats } from './stats';

export class CharacterStats extends Stats {
  private res: number;
  private mag: number;
  private alt: number;

  private mel: number;
  private acc: number;

  constructor() {
    super();
  }

  serialize() {
    return {
      ...super.serialize(),
      res: this.res,
      alt: this.alt,
      mag: this.mag,

      mel: this.mel,
      acc: this.acc,
    }
  }
}