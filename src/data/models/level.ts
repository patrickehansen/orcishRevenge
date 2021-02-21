import mongoose from 'mongoose';
import { Tile } from './tile';

export const Level = new mongoose.Schema({
  Tiles: [Tile]
})