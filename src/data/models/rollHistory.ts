import { Moment } from 'moment';
import mongoose, { Document, Schema } from 'mongoose';

export interface IRollHistory extends Document {
  id: string;
  Sent: Moment;
  Sender: string;
  Dice: Array<number>;
  Size: number;
  Count: number;
  Operator: string;
  Post: string;
  Raw: string;
  Total: number;
}

export const rollHistorySchema = new Schema({
  id: String,
  Sent: {type: Date, default: Date.now},
  Sender: String,
  Dice: [Number],
  Size: Number,
  Count: Number,
  Operator: String,
  Post: String,
  Raw: String,
  Total: Number,
})

export const RollHistory = mongoose.model<IRollHistory>('RollHistory', rollHistorySchema);


// rollHistorySchema.methods.toMessage = function() {
//   return {
//     Sender: this.Sender,
//     Roll: {
//       dice: this.Dice,
//       sum: this.Dice.reduce((a,b) => a+b,0),
//       count : this.Count,
//       size: this.Size,
//       post : this.Post,
//       operator : this.Operator,
//       raw: this.Raw,
//       total: this.Total,
//     },
//     Sent: this.Sent,
//     Type: 'roll',
//   }
// }
