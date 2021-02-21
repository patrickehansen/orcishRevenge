import { Request } from '@hapi/hapi';
import  Boom  from '@hapi/boom';

import * as models from '../models/account';
import * as service from '../services/account';

export async function getAccount(req: Request):Promise<models.Account> {
  try {
    console.info('##accountHandler::#getAccount::starting execution');
    const username = req.pre.user.Username;

    const result = await service.getAccount(username);
    console.info('##accountHandler::#getAccount::successful execution');
    return result;
  } catch (err) {
    console.error('##accountHandler::#getAccount::error', err);
    return Boom.badImplementation();
  }
}

export async function login(req: Request) {
  try {
    console.info('##accountHandler::#login::starting execution');
    const {username, password} = req.payload as any;

    const result = await service.login(username, password);
    console.info('##accountHandler::#login::successful execution');

    if (result) return result;

    return Boom.unauthorized('Username or password incorrect.')
  } catch (err) {
    console.error('##accountHandler::#login::error', err);
    return Boom.badImplementation();
  }
}

export async function register(req: Request) {
  try {
    console.info('##accountHandler::#getAccount::starting execution');
    const {username, email, password} = req.payload as any;  //models.

    const result = await service.register(username, email, password);
    console.info('##accountHandler::#getAccount::successful execution');
    return result;
  } catch (err) {
    console.error('##accountHandler::#getAccount::error', err);
    return Boom.badImplementation();
  }
}