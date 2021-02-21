import mongoose, { Document, Schema } from 'mongoose';

const item = new Schema({
  Quantity: Number,
  Name: String,
  Effect: String,
  Armor: String,
  Damage: String,
  Notes: String,
});

const itemSection = new Schema({
  SectionName: String,
  Placement: String,
  Items: [ item ],
});