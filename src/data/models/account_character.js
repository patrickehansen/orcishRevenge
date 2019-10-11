const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  AccountID: String,
  CharacterID: String,
})

module.exports = accountSchema;