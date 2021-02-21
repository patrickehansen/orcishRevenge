import { Item } from "./item";

export class Container extends Item {
  private _items: {[key: string]: Item} = {};

  constructor() {
    super()
  }

  public add(item: Item) {
    this._items[item.id] = item;
  }

  public get(id: string): Item {
    return this._items[id];
  }

  public remove(id: string): Item {
    const item = this._items[id];
    delete this._items[id];

    return item;
  }

  public getItems(): Array<Item> {
    return Object.values(this._items);
  }
}