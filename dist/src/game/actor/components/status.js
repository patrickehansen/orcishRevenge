"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
const events_1 = require("events");
class Status extends events_1.EventEmitter {
    constructor() {
        super();
        this.hitPoints = {
            current: 0,
            total: 0,
        };
        this.manaPoints = {
            current: 0,
            total: 0,
        };
        this.actionPoints = {
            current: 0,
            total: 0,
        };
        this.craftingPoints = {
            current: 0,
            total: 0,
        };
        this._xp = 0;
    }
    get xp() {
        return this._xp;
    }
    addXP(value) {
        this._xp += value;
    }
    set hp(value) {
        this.hitPoints.current = value;
    }
    set mp(value) {
        this.manaPoints.current = value;
    }
    set ap(value) {
        this.actionPoints.current = value;
    }
    set cp(value) {
        this.craftingPoints.current = value;
    }
    init(serialized) {
        this.hitPoints = serialized.hp;
        this.manaPoints = serialized.mp;
        this.actionPoints = serialized.ap;
        this.craftingPoints = serialized.cp;
        this._xp = serialized.xp;
    }
    serialize() {
        return {
            hp: this.hitPoints,
            mp: this.manaPoints,
            ap: this.actionPoints,
            cp: this.craftingPoints,
            xp: this.xp,
        };
    }
    addModifier(modifier) { }
    removeModifier(id) { }
}
exports.Status = Status;
//# sourceMappingURL=status.js.map