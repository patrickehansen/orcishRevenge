import bcrypt from 'bcryptjs';
import database from '../database';
import * as models from '../../models/account';

export async function verifyUser(username: string, password: string): Promise<boolean | models.Account> {
  if (!username || !password) {
    throw new Error('Must provide both a username and a password.');
  }

  try {
    const found = await database.Account.findOne({
      Username: username
    });

    if (!found) return false;
  
    const isValid =await bcrypt.compare(password, found.Hash)
  
    if (isValid) return found;
    return false;
  } catch (err) {
    console.error('dataManager::account::verifyUser', err);
    throw err;
  }
}

export async function createAccount(username, password, email): Promise<models.Account | boolean> {
  try {
    const found = await database.Account.findOne({$or: [
      {Username: username},
      {EmailAddress: email},
    ]});
  
    if (found) throw new Error('Duplicate username');
  
    const hash = await bcrypt.hash(password, 10);
  
    const account = await database.Account.create({
      Username: username,
      Hash: hash,
      EmailAddress: email,
      Created: Date.now(),
    }).catch(error => {
      console.error('Error creating an account', error);
      throw error;
    })
  
    return !!account;
  } catch (err) {
    console.error('dataManager::account::CreateAccount', err);
    throw err;
  }
}

export async function changePassword(username, password) {
  try {
    const found = await database.Account.findOne(
      {Username: username},
    )
  
    if (found) {
      let hash = await bcrypt.hash(password, 10);
  
      found.Hash = hash;
  
      await found.save();
    }
  } catch (err) {
    console.error('dataManager::account::ChangePassword', err);
    throw err;
  }
}

export async function deleteAccount(username) {
  try {
    const deleted = await database.Account.deleteOne({
      Username: username
    })
  
    return !!deleted;
  } catch (err) {
    console.error('dataManager::account::DeleteAccount', err);
    throw err;
  }
}

export async function findAccount(username) {
  try {
    return database.Account.findOne({
      Username: username
    })
  } catch (err) {
    console.error('dataManager::account::FindAccount', err);
    throw err;
  }
}
