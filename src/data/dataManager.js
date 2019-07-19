const bcrypt = require('bcryptjs');
const database = require('./database');

module.exports.VerifyUser = async function VerifyUser(username, password) {
  if (!username || !password) {
    throw new Error('Must provide both a username and a password.');
  }

  let found = await database.Account.findOne({
    Username: username
  }).catch(error => {
    console.error('Error finding a user', error);
    throw error;
  })

  if (!found) {
    return false;
  }

  let isValid = await found.compare(username, password);

  return isValid;
}

module.exports.CreateAccount = async function CreateAccount(username, password, email) {
  let found = await database.Account.findOne({$or: [
    {Username: username},
    {EmailAddress: email},
  ]}).catch(error => {
    console.error('Error finding an account', error);
    throw error;
  })

  if (found) {
    throw new Error('Duplicate username');
  }

  let hash = await bcrypt.hash(password, 10);

  let account = await database.Account.create({
    Username: username,
    Hash: hash,
    EmailAddress: email,
    Created: Date.now(),
  }).catch(error => {
    console.error('Error creating an account', error);
    throw error;
  })

  return !!account;
}

module.exports.DeleteAccount = async function DeleteAccount(username) {
  let deleted = await database.Account.deleteOne({
    Username: username
  })
}

module.exports.FindAccount = async function FindAccount(username) {
  return database.Account.findOne({
    Username: username
  })
}