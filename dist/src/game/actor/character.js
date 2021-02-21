"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const pawn_1 = require("./pawn");
class Character extends pawn_1.Pawn {
    constructor(id, { stats, status, inventory }) {
        super(id, { stats, status, inventory });
    }
}
exports.Character = Character;
//# sourceMappingURL=character.js.map