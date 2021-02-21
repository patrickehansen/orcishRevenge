"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modifier = void 0;
class Modifier {
    constructor() { }
    ;
    get id() {
        return this._id;
    }
    serialize() {
        return {
            id: this._id,
            remainingTurns: this.remainingTurns,
            affects: this.affects,
        };
    }
    onAttached(stats) {
        this._modifies = stats;
    }
    onTurnEnd() {
        if (this.remainingTurns > 0) {
            this.remainingTurns -= 1;
        }
    }
}
exports.Modifier = Modifier;
//# sourceMappingURL=modifier.js.map