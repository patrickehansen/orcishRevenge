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
  console.log('Mongoose error', error);
})

db.once('open', () => {
  console.log('Mongo connection opened!');

  const accountSchema = require('./models/account');
  accountSchema.plugin(autoIncrement, {inc_field: '_acountid'});

  const Account = mongoose.model('Accounts', accountSchema);

  const chatSchema = require('./models/chatHistory');
  chatSchema.plugin(autoIncrement, {inc_field: '_chatHistoryid'});

  const ChatHistory = mongoose.model('ChatHistory', chatSchema)

  const rollHistory = require('./models/rollHistory');
  rollHistory.plugin(autoIncrement, {inc_field: '_rollHistoryid'});

  const RollHistory = mongoose.model('RollHistory', rollHistory)


  exporting.Account = Account;
  exporting.ChatHistory = ChatHistory;
  exporting.RollHistory = RollHistory;
  exporting.Ready = true;
})

module.exports = exporting;