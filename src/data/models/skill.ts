import mongoose, { Document, Schema } from 'mongoose';


const skill = new mongoose.Schema({
  Name: String,
  Score: Number,
  MPCost: Number,
  APCost: Number,
  Damage: String,
  Notes: String,
});

const skillSection = new mongoose.Schema({
  SectionName: String,
  Placement: String,
  Skills: [ skill ],
});