import { EventEmitter } from 'events';
import { Moment } from 'moment';
import * as gameModels from './utility';
import { Character as CharacterInstance} from '../game/actor/character';

export interface CharacterDictionary {
  [id: string] : CharacterInstance
}

export interface Character {
  _characterid: number;
  // Basic 
  Created: Moment;
  Name: string;
  Creator: string;
  Avatar: string; 
  
  RoleplayAttributes: RolePlayAttributes;
  SkillAttributes: SkillAttributes;
  StatusPoints: StatusPoints;

  Notepads: Array<number>;

  Skills: Array<SkillSection>;
  Items: Array<ItemSection>;
}

export interface RolePlayAttributes {
  // RP Physical descriptors
  Height: string;
  Weight: string;
  EyeColor: string;
  HairColor: string;
  SkinColor: string;
  Build: string;
  Age: number;
  GeneralNotes: string;
  
  // RP Personality descriptors
  Dislikes: Array<Like>;
  Likes: Array<Like>;
  Vices: Array<Like>;
}

export interface SkillAttributes {
  Endurance: number;
  Strength: number;
  Agility: number;
  Reasoning: number;
  MagicalAffinity: number;
  Alertness: number;

  Melee: number;
  Accuracy: number;
}

export interface StatusPoints {
  HitPoints: Points;
  MagicPoints: Points;
  ActionPoints: Points;
}

export interface Points {
  Current: number;
  Total: number;
  Modifier: number;
}

export interface SkillSection {
  SectionName: string;
  Placement: string;
  Skills: Array<Skill>,
}

export interface ItemSection {
  SectionName: string;
  Placement: string;
  Items: Array<Item>;
}

export interface Skill {
  Name: string;
  Score: number;
  MPCost?: number;
  APCost?: number;
  Damage?: string;
  Notes: string;
}

export interface Like {
  Title: string;
  Description: string;
}

export interface Item {
  Quantity: number;
  Name: string;
  Location: string;
  Effect: string;
  Notes: string;
}

export interface Weapon extends Item {
  Damage: Array<Damage>;
  Equipped: boolean;
}

export interface Armor extends Item {
  Armor: Array<Mitigation>;
  Equipped: boolean;
  Slot: string;
}

export interface Ammunition extends Item {
  Damage: Array<Damage>;
}

export interface Mitigation {
  Type: string;
  Value: number;
}

export interface Damage {
  Type: string;
  RollInput: gameModels.RollInput;
  RollResult: gameModels.RollOutput;
}

export declare class Party extends EventEmitter {
  constructor();
  public get characters(): Array<Character>;
}