"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = void 0;
const actor_1 = require("./actor");
class Pawn extends actor_1.Actor {
    constructor(id, { stats, status, inventory }) {
        super(id);
        this._stats = stats;
        this._status = status;
        this._inventory = inventory;
    }
    set controller(controller) {
        this._controller = controller;
    }
    get controller() {
        return this._controller;
    }
}
exports.Pawn = Pawn;
//# sourceMappingURL=pawn.js.map