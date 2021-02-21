import mongoose from 'mongoose';

export const Stats = new mongoose.Schema({
  END: Number,
  STR: Number,
  AGI: Number,
  RES: Number,
  MAG: Number, 
  ALT: Number,

  INT: Number,
  SPD: Number,

  MEL: Number,
  ACC: Number,
});

