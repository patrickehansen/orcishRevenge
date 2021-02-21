import { Moment } from 'moment';
import mongoose, { Document, Schema } from 'mongoose';

export interface ICharacter extends Document {
  id: string;
  Created: Moment;
  Name: string;
  Creator: string;
  Avatar: string;
}

export const characterSchema = new Schema({
  id: String,
  // Basic 
  Created: {type: Date, default: Date.now},
  Name: String,
  Creator: String,
  Avatar: String,

  // RoleplayAttributes: rpAttribs,
  // // SkillAttributes: skillAttribs,
  // // StatusPoints: statusPoints,

  // Notepads: [Number],

  // Skills: [ skillSection ],
  // Items: [ itemSection ],
});


export const Characters = mongoose.model<ICharacter>('Characters', characterSchema);