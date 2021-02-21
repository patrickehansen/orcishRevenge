"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterStats = void 0;
const stats_1 = require("./stats");
class CharacterStats extends stats_1.Stats {
    constructor() {
        super();
    }
    serialize() {
        return Object.assign(Object.assign({}, super.serialize()), { res: this.res, alt: this.alt, mag: this.mag, mel: this.mel, acc: this.acc });
    }
}
exports.CharacterStats = CharacterStats;
//# sourceMappingURL=characterStats.js.map