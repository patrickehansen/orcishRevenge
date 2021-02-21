import mongoose, { Document, Schema } from 'mongoose';

const like = new mongoose.Schema({
  Title: String,
  Description: String,
})

const rpAttribs = new mongoose.Schema({
  Height: String,
  Weight: String,
  EyeColor: String,
  HairColor: String,
  SkinColor: String,
  Build: String,
  Age: Number,
  GeneralNotes: String,
  
  // RP Personality descriptors
  Dislikes: [like],
  Likes: [like],
  Vices: [like],
})
