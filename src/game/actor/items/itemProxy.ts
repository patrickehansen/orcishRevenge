import { Actor } from '../actor';
import { Item } from './item';

export class ItemProxy extends Actor {
  private _item: Item;
  
  constructor(id: string, item: Item) {
    super(id);

    this._item = item;
  }

  public take() {
    this.destroy();
    return this._item;
  }
}