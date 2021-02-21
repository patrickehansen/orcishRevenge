import { Actor } from './actor';
import { Stats } from './components/stats';
import { Status } from './components/status';

import { Controller } from '../controller/controller';
import { Container } from './items/container';

export class Pawn extends Actor {
  private _stats: Stats;  
  private _status: Status;
  private _inventory: Container;

  private _controller: Controller;
  
  constructor(id, {stats, status, inventory}) {
    super(id);

    this._stats = stats;
    this._status = status;
    this._inventory = inventory;
  }

  public set controller(controller: Controller) {
    this._controller = controller;
  }

  public get controller(): Controller {
    return this._controller;
  }
}