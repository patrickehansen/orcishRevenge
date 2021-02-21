import { Moment } from 'moment';
import mongoose, { Document, Schema } from 'mongoose';

export interface INotepad extends Document {
  id: string;
  CreatedDate: Moment;
  Text: any; // hmmmmm
  Title: string;
}

export const notepadSchema = new Schema({
  id: String,
  CreatedDate: {type: Date, default: Date.now},
  Text: Object,
  Title: String,
})

export const Notepads = mongoose.model<INotepad>('Notepads', notepadSchema);