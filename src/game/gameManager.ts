import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { GameServer } from './game';
import * as dataManager from '../data/dataManager';
import { SocketServer } from '../models/socket';
import { GameState } from './components/gameState';
import { GameWorld } from './components/gameWorld';
import { GameMode } from './components/gameMode';
import { Lobby } from './components/lobby';
import { WorldFactory } from './world/worldFactory';

import * as models from '../models/game';

export class GameFactory extends EventEmitter {
  private _games: {
    [id: string] : GameServer
  } = {};
  private _socketServer: SocketServer;

  constructor() {
    super();
  }

  public set socketServer(server) {
    this._socketServer = server;
  }

  buildGameFromSave(saveData): GameServer {
    const game = new GameServer({
      id: saveData.id,
      name: saveData.name,
      state: new GameState(saveData.state),
      mode: new GameMode(saveData.mode),
      lobby: new Lobby(saveData.lobby),
      world: WorldFactory.buildWorld(saveData.world),
    });

    const id = game.id;

    this._games[id] = game;

    return game;
  }

  buildNewGame(name: string): GameServer {
    const game = new GameServer({
      id: undefined,
      name: name,
      state: new GameState(),
      mode: new GameMode(),
      lobby: new Lobby(),
      world: WorldFactory.buildWorld(),
    })
    const id = game.id;

    this._games[id] = game;

    return game;
  }

  async buildGame(id: string): Promise<GameServer> {
    const saveData = await dataManager.getGame(id);

    return this.buildGameFromSave(saveData);
  }

  getGame(id: string): GameServer {
    return this._games[id];
  }

  getGames(): Array<models.GameInfo> {
    return Object.values(this._games).map(v => ({
      id: v.id,
      name: v.name,
      ongoing: v.ongoing,
      playerCount: v.playerCount,
      image: v.image,
    }));
  }

  async startGame(id: string): Promise<GameServer> {
    const game = this._games[id];

    game.beginPlay();

    return game;
  }

  async endGame(id: string): Promise<GameServer> {
    const game = this._games[id];

    game.endPlay();

    return game;
  }
}

export default new GameFactory();