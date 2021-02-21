"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Party = void 0;
class Party {
    constructor(id, name) {
        this._players = {};
        this._id = id;
        this._name = name;
    }
    serialize() {
    }
    addPlayer(player) {
        this._players[player.id] = player;
    }
    removePlayer(id) {
        const controller = this._players[id];
        delete this._players[id];
        return controller;
    }
    get players() {
        return Object.values(this._players);
    }
}
exports.Party = Party;
//# sourceMappingURL=party.js.map