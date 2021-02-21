"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stats = void 0;
class Stats {
    constructor() {
        this.agi = NaN;
        this.end = NaN;
        this.str = NaN;
        this.int = NaN;
        this.spd = NaN;
    }
    serialize() {
        return {
            agi: this.agi,
            end: this.end,
            str: this.str,
            int: this.int,
            spd: this.spd,
            modifiers: this.modifiers.map(v => v.serialize()),
        };
    }
    addModifier(modifier) {
        modifier.onAttached(this);
        this.modifiers.push(modifier);
    }
    removeModifier(modifierId) { }
    getStat(name) {
        if (this[name])
            return this[name];
        return NaN;
    }
    setStat(name, value) {
        if (!this[name] || typeof this[name] !== 'number')
            return;
        this[name] = value;
    }
}
exports.Stats = Stats;
//# sourceMappingURL=stats.js.map