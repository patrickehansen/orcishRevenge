import mongoose from 'mongoose';

export const Modifier = new mongoose.Schema({
  RemainingTurns: Number,
  Affects: String,
})