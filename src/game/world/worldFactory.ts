import Honeycomb from 'honeycomb-grid';
import { World } from './world';
import { Level } from './level';
import { Hex } from './hex';
import { Tile } from './tile';

export class WorldFactory {
  constructor() {}

  private static buildWorldFromData(saveData) {

  }

  private static buildDefaultWorld() {
    
  }

  private static buildLevel() {
    const hex = Honeycomb.extendHex({ size: 30 });
    const Grid = Honeycomb.defineGrid(hex);
    const grid = Grid.rectangle({
      width: 200,
      height: 150,
    })
  }

  public static buildWorld(saveData?) {
    if (saveData) {
      return this.buildWorldFromData(saveData);
    }

    return this.buildDefaultWorld();
  }
}