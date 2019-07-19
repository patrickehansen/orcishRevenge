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
  accountSchema.plugin(autoIncrement, {inc_field: 'id'});

  const Account = mongoose.model('Accounts', require('./models/account'));

  exporting.Account = Account;
  exporting.Ready = true;
})

module.exports = exporting;