
import * as models from '../models/game';
import gameManager from '../game/gameManager';


export async function getGames():Promise<Array<models.GameInfo>> {
  try {
    console.info('##gameService::#getGames::starting execution');
    const result = await gameManager.getGames();

    console.info('##gameService::#getGames::successful execution');
    return result;
  } catch (err) {
    console.error('##gameService::#getGames::error', err);
    throw err;
  }
}
