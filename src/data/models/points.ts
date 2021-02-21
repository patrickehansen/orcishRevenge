import mongoose from 'mongoose';

export const Points = new mongoose.Schema({
  Current: Number,
  Total: Number,
})