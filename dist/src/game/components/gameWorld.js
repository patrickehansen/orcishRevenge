"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameWorld = void 0;
const events_1 = require("events");
class GameWorld extends events_1.EventEmitter {
    constructor() {
        super();
        this._playerCharacters = {};
    }
    getCharacters() {
        return Object.values(this._playerCharacters);
        ;
    }
    addCharacter(character, id) {
        this._playerCharacters[id] = character;
    }
}
exports.GameWorld = GameWorld;
//# sourceMappingURL=gameWorld.js.map