"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Party = void 0;
const events_1 = require("events");
class Party extends events_1.EventEmitter {
    constructor() {
        super();
    }
    get characters() {
        return Object.values(this._characters);
    }
}
exports.Party = Party;
//# sourceMappingURL=party.js.map