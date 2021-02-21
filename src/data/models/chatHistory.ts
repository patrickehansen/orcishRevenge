import { Moment } from 'moment';
import mongoose, { Document, Schema } from 'mongoose';

export interface IChatHistory extends Document {
  id: string;
  Sent: Moment;
  Message: string;
  Sender: string;
}

const chatHistorySchema = new Schema({
  id: String,
  Sent: {type: Date, default: Date.now},
  Message: String,
  Sender: String,
})

chatHistorySchema.methods.toMessage = function() {
  return {
    Sender: this.Sender,
    Message: this.Message,
    Sent: this.Sent,
    Type: 'chat',
  }
}

export const ChatHistory = mongoose.model<IChatHistory>('ChatHistory', chatHistorySchema);