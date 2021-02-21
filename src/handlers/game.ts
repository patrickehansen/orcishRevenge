import { Request } from '@hapi/hapi';
import  Boom  from '@hapi/boom';

import * as models from '../models/game';
import * as service from '../services/games';

export async function getGames():Promise<Array<models.GameInfo>> {
  try {
    console.info('##gameHandler::#getGames::starting execution');
    const result = await service.getGames();
    console.info('##gameHandler::#getGames::successful execution');
    return result;
  } catch (err) {
    console.error('##gameHandler::#getGames::error', err);
    return Boom.badImplementation();
  }
}
