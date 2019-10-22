const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const config = require('../../config');

mongoose.connect(config.mongoUrl, {useNewUrlParser: true});

const db = mongoose.connection;

const exporting = {
  Ready: false,
  Connection: db,
};

db.on('error', (error) => {
  console.error('Mongoose error', error);
})

db.once('open', () => {
  console.log('Mongo connection opened!');

  const accountSchema = require('./models/account');
  accountSchema.plugin(autoIncrement, {inc_field: '_acountid'});

  const chatSchema = require('./models/chatHistory');
  chatSchema.plugin(autoIncrement, {inc_field: '_chatHistoryid'});

  const rollHistory = require('./models/rollHistory');
  rollHistory.plugin(autoIncrement, {inc_field: '_rollHistoryid'});

  const character = require('./models/character');
  character.plugin(autoIncrement, {inc_field: '_characterid'});
  
  const notepad = require('./models/notepad');
  notepad.plugin(autoIncrement, {inc_field: '_notepadid'});

  exporting.Account = mongoose.model('Accounts', accountSchema);
  exporting.AccountCharacter = mongoose.model('Account_Character', require('./models/account_character'));
  exporting.Character = mongoose.model('Character', character)
  exporting.ChatHistory = mongoose.model('ChatHistory', chatSchema);
  exporting.RollHistory =  mongoose.model('RollHistory', rollHistory);
  exporting.Notepads = mongoose.model('Notepads', notepad);

  exporting.Ready = true;
})

module.exports = exporting;