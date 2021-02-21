"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Level = void 0;
const events_1 = require("events");
class Level extends events_1.EventEmitter {
    constructor(world, tiles) {
        super();
        this._world = world;
        this._tiles = tiles;
    }
}
exports.Level = Level;
//# sourceMappingURL=level.js.map