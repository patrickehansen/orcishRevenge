import * as accountModels from '../models/account';
import * as dataManager from '../data/management/account';

import * as token from '../util/token';

export async function getAccount(username: string): Promise<accountModels.Account> {
  try {
    console.info('##accountService::#getAccount::starting execution');
    const account = await dataManager.findAccount(username);

    console.info('##accountService::#getAccount::successful execution');
    return {
      Username: account.Username,
      IsGM: account.IsGM,
      DisplayName: account.DisplayName,
    }
  } catch (err) {
    console.error('##accountService::#getAccount::error', err);
    throw err;
  }
}

export async function login(username: string, password: string): Promise<boolean> {
  try {
    console.info(`##accountService::#login::${username}::starting execution`);
    if (!username || !password) {
      return null;
    }
  
    const user = await dataManager.verifyUser(username, password);
  
    if (user) {
      let idToken = token.createToken(user);

      console.info(`##accountService::#login::${username}::successful execution`);
      return idToken;
    } else {
      console.info(`##accountService::#login::${username}::failed execution::mismatch`);
      return null;
    }
  } catch (err) {
    console.error('##accountService::#login::error', err);
    throw err;
  }
}

export async function register(username: string, email: string, password: string): Promise<accountModels.Account> {
  try {
    console.info('##accountService::#register::starting execution');
    let err;

    const created = await dataManager.createAccount(username, password, email);

    console.info('##accountService::#register::successful execution');
    if (!created) return null;

    const create = created as accountModels.Account;

    return {
      Username: create.Username,
      IsGM: create.IsGM,
      DisplayName: create.DisplayName,
    }
  } catch (err) {
    console.error('##accountService::#register::error', err);
    throw err;
  }
}