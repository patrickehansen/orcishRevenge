const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const accountSchema = new mongoose.Schema({
  _accountid: Number,
  Username: String,
  EmailAddress: String,
  Hash: String,
  Created: {type: Date, default: Date.now},
  DisplayName: String,
  LastLogin: Date
}, {_accountid: false})

accountSchema.methods.compare = async function (username, password) {
  if (username !== this.Username) {
    return false;
  }

  let isValid = await bcrypt.compare(password, this.Hash).catch(error => {
    console.error('Error comparing hash', error);
    throw error;
  })

  return isValid;
}

module.exports = accountSchema;