"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = void 0;
const events_1 = require("events");
class Actor extends events_1.EventEmitter {
    constructor(id) {
        super();
        this._blocks = false;
        this._hidden = false;
        this._id = id;
    }
    get id() {
        return this._id;
    }
    tick() {
    }
    serialize() {
        return {
            Uuid: this._id,
            Rotation: this._rot,
            Tile: this._tile.id,
            Icon: this._icon,
            Hidden: this._hidden,
        };
    }
    deserialize() {
    }
    get pos() {
        return Object.assign({}, this._tile.pos);
    }
    get tile() {
        return this._tile;
    }
    set tile(newTile) {
        this._tile = newTile;
        this.emit('moved', newTile);
    }
    get rot() {
        return this._rot;
    }
    set rot(rotation) {
        this._rot = rotation;
    }
    getDistanceTo(other) {
        return this._tile.distance(other);
    }
    getDirectionTo(other) {
        const tileDir = this._tile.directionTo(other);
        //hmmmmmmmmm
        return tileDir + this._rot;
    }
    getLevel() {
        return this._tile.level;
    }
    get hidden() {
        return this._hidden;
    }
    set hidden(hidden) {
        this._hidden = hidden;
        this.emit('hidden');
    }
    // What the hell is the data type of this???
    get icon() {
        return this._icon;
    }
    setIcon(icon) {
        this._icon = icon;
        this.emit('iconChanged', icon);
    }
    get blocks() {
        return this._blocks;
    }
    set blocks(blocks) {
        this._blocks = blocks;
    }
    destroy() {
        this.emit('destroyed');
    }
}
exports.Actor = Actor;
//# sourceMappingURL=actor.js.map