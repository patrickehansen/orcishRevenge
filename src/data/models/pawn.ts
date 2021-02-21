import mongoose from 'mongoose';

export const Pawn = new mongoose.Schema({
  Uuid: String,

  Current: Number,
  Total: Number,
})