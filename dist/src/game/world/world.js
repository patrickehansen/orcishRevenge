"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const events_1 = require("events");
const uuid_1 = require("uuid");
class World extends events_1.EventEmitter {
    constructor(id, levels) {
        super();
        this._id = id || uuid_1.v4();
        this._levels = levels;
    }
    get levels() {
        return this._levels;
    }
    set game(game) {
        this._game = game;
    }
}
exports.World = World;
//# sourceMappingURL=world.js.map