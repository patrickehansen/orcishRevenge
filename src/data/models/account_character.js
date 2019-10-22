const mongoose = require('mongoose');

const joinSchema = new mongoose.Schema({
  AccountID: String,
  CharacterID: String,
})

module.exports = joinSchema;