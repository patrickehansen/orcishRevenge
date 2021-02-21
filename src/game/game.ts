import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';

import config from '../config';
import * as diceRoller from './diceRoller';
import { Character } from './actor/character';
import { Controller } from './controller/controller';
import { GameState } from './components/gameState';
import { GameMode } from './components/gameMode';
import { GameWorld } from './components/gameWorld';
import { Lobby } from './components/lobby';

export class GameServer extends EventEmitter {
  private _id: string;
  private _name: string;
  private _playing: boolean = false;
  private _icon: string;

  private _timer: NodeJS.Timeout;

  private _gameState: GameState;
  private _gameMode: GameMode;
  private _gameWorld: GameWorld;
  private _lobby: Lobby;

  constructor({id, name, state, mode, world, lobby}) {
    super();

    this._id = id || uuidv4();
    this._name = name;
    this._gameState = state;
    this._gameMode = mode;
    this._gameWorld = world;
    this._lobby = lobby;
  }

  public set socketServer(server) {
    this._lobby.socketServer = server;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get image(): string {
    return this._icon;
  }

  public get playerCount(): number {
    return this._lobby.getPlayers().length;
  }

  public get ongoing(): boolean {
    return this._lobby.getPlayers().length > 1 || this._playing;
  }

  public beginPlay() {
    this._playing = true;
    this.emit('beginPlay');
    this._timer = setInterval(this.tick, config.tickRate);
  }

  public endPlay() {
    this._playing = false;
    this.emit('endPlay');
    clearInterval(this._timer);
  }

  private tick() {
    this.processInput();

    this.update();

    this.serialize();
  }

  private processInput() {}

  private update() {}

  private serialize() {}
}