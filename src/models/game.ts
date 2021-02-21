import { EventEmitter } from 'events';
import { Controller } from './controller';
import { GameWorld } from './world';
import { SocketServer } from './socket';

export declare class GameManager extends EventEmitter {
  constructor();
  public set socketServer(server);

  buildGameFromSave(saveData): GameServer;
  buildDefaultGame(): GameServer;
  buildGame(id: string): Promise<GameServer>;

  getGame(id: string): GameServer;
  getGames(): Array<string>;

  // startGame(id: string): Promise<GameServer>;
  // endGame(id: string): Promise<GameServer>;
  // pauseGame(id: string);
}

export declare class GameServer extends EventEmitter {
  constructor(GameServerOptions)
  socketServer(socketServer): void;
  beginPlay(): void;
  endPlay(): void;

  start(): void;
  end(): void;
  pause(): void;
}

export declare class GameState extends EventEmitter {
  constructor();
  serialize(): any; // GameState data object
  public get inCombat(): boolean;
}

export declare class GameMode extends EventEmitter {
  public get apPerHex(): number;
  public set apPerHex(ap: number);
}

export declare class Lobby extends EventEmitter {
  constructor();
  public set socketServer(server: SocketServer);
  public getPlayers(): Array<Controller>;
  public addUser(controller: Controller);
  public removeUser(controller: Controller);
}

export interface GameServerOptions {
  id: string; 
  name: string; 

  state: GameState;
  mode: GameMode;
  world: GameWorld;
  lobby: Lobby;
}

export interface GameInfo {
  id: string;
  name: string;
  ongoing: boolean;
  playerCount: number;
  image: string;
}