import mongoose, { Document, Schema } from 'mongoose';
import { Moment } from 'moment';

export const accountSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  EmailAddress: String,
  Hash: {
    type: String,
    required: true,
  },
  Created: {
    type: Date, 
    default: Date.now
  },
  DisplayName: String,
  LastLogin: Date,
  IsGM: Boolean,
  Characters: [String],
})

export interface IAccount extends Document {
  id: string;
  Username: string;
  EmailAddress: string;
  Hash: string;
  Created: Moment;
  DisplayName: string;
  LastLogin: Moment;
  IsGM: boolean;
  Characters: Array<string>;
}

export const Accounts = mongoose.model<IAccount>('Accounts', accountSchema);