const mongoose = require('mongoose');

const notepadSchema = new mongoose.Schema({
  _notepadid: Number,
  CreatedDate: {type: Date, default: Date.now},
  Text: Object,
  Sender: String,
}, {_notepadid: false})

module.exports = notepadSchema;