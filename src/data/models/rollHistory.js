const mongoose = require('mongoose');

const rollHistorySchema = new mongoose.Schema({
  _rollHistoryid: Number,
  Sent: {type: Date, default: Date.now},
  Sender: String,
  Dice: [Number],
  Size: Number,
  Count: Number,
  Operator: String,
  Post: Number,
  Raw: String,
  Total: Number,
}, {_rollHistoryid: false})

rollHistorySchema.methods.toMessage = function() {
  return {
    Sender: this.Sender,
    Roll: {
      dice: this.Dice,
      sum: this.Dice.reduce((a,b) => a+b,0),
      count : this.Count,
      size: this.Size,
      post : this.Post,
      operator : this.Operator,
      raw: this.Raw,
      total: this.Total,
    },
    Sent: this.Sent,
    Type: 'roll',
  }
}

module.exports = rollHistorySchema;