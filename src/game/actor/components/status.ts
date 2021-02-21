import { EventEmitter } from 'events';
import { StatusModifier } from '../modifiers/statusModifier';
import { Points } from '../../../models/actor';

export class Status extends EventEmitter {
  private hitPoints: Points;
  private manaPoints: Points;
  private actionPoints: Points;
  private craftingPoints: Points;

  private _xp: number;

  constructor() {
    super();

    this.hitPoints = {
      current: 0,
      total: 0,
    }

    this.manaPoints = {
      current: 0,
      total: 0,
    }

    this.actionPoints = {
      current: 0,
      total: 0,
    }

    this.craftingPoints = {
      current: 0,
      total: 0,
    }

    this._xp = 0;
  }

  public get xp() {
    return this._xp;
  }

  public addXP(value: number) {
    this._xp += value;
  }

  public set hp(value: number) {
    this.hitPoints.current = value;
  }

  public set mp(value: number) {
    this.manaPoints.current = value;
  }

  public set ap(value: number) {
    this.actionPoints.current = value;
  }

  public set cp(value: number) {
    this.craftingPoints.current = value;
  }

  public init(serialized) {
    this.hitPoints = serialized.hp;
    this.manaPoints = serialized.mp;
    this.actionPoints = serialized.ap;
    this.craftingPoints = serialized.cp;
    this._xp = serialized.xp;
  }

  public serialize() {
    return {
      hp: this.hitPoints,
      mp: this.manaPoints,
      ap: this.actionPoints,
      cp: this.craftingPoints,
      xp: this.xp,
    }
  }

  public addModifier(modifier: StatusModifier) {}
  public removeModifier(id: number) {}
}