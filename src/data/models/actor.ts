import mongoose, { Document, Schema } from 'mongoose';

export interface IActor extends Document {
  id: string;
}

export const actorSchema = new Schema({
  id: String,
})

export default mongoose.model<IActor>('Actors', actorSchema);