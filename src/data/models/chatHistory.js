const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
  _chatHistoryid: Number,
  Sent: {type: Date, default: Date.now},
  Message: String,
  Sender: String,
}, {_chatHistoryid: false})

chatHistorySchema.methods.toMessage = function() {
  return {
    Sender: this.Sender,
    Message: this.Message,
    Sent: this.Sent,
    Type: 'chat',
  }
}

module.exports = chatHistorySchema;