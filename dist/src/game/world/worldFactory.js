"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldFactory = void 0;
const honeycomb_grid_1 = __importDefault(require("honeycomb-grid"));
class WorldFactory {
    constructor() { }
    static buildWorldFromData(saveData) {
    }
    static buildDefaultWorld() {
    }
    static buildLevel() {
        const hex = honeycomb_grid_1.default.extendHex({ size: 30 });
        const Grid = honeycomb_grid_1.default.defineGrid(hex);
        const grid = Grid.rectangle({
            width: 200,
            height: 150,
        });
    }
    static buildWorld(saveData) {
        if (saveData) {
            return this.buildWorldFromData(saveData);
        }
        return this.buildDefaultWorld();
    }
}
exports.WorldFactory = WorldFactory;
//# sourceMappingURL=worldFactory.js.map