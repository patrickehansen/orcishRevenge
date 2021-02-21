import mongoose from 'mongoose';
import { Level } from './level';

export const Points = new mongoose.Schema({
  Levels : [Level]
})