"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hex = void 0;
const events_1 = require("events");
const uuid_1 = require("uuid");
class Hex extends events_1.EventEmitter {
    constructor(id) {
        super();
        this._id = id || uuid_1.v4();
    }
    set tile(tile) {
        this._tile = tile;
    }
}
exports.Hex = Hex;
//# sourceMappingURL=hex.js.map