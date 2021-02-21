import mongoose from 'mongoose';
import { Points } from './points';
import { Modifier } from './modifier';

export const Status = new mongoose.Schema({
  HitPoints: Points,
  MagicPoints: Points,
  ActionPoints: Points,
  CraftingPoints: Points,

  Modifiers: [ Modifier ]
})