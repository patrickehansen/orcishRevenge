"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
const events_1 = require("events");
const uuid_1 = require("uuid");
class Tile extends events_1.EventEmitter {
    constructor(id, hex, level) {
        super();
        this._blocked = false;
        this._id = id || uuid_1.v4();
        this._hex = hex;
        this._level = level;
    }
    get id() {
        return this._id;
    }
    get hex() {
        return this._hex;
    }
    get level() {
        return this._level;
    }
    get blocked() {
        return this._blocked;
    }
    set blocked(value) {
        this._blocked = value;
        if (value)
            this.emit('blocked');
        else
            this.emit('unblocked');
    }
    get color() {
        return this._color;
    }
    set color(newColor) {
        this._color = newColor;
    }
}
exports.Tile = Tile;
//# sourceMappingURL=tile.js.map