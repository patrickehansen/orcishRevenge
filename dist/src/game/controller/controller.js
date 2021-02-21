"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const events_1 = require("events");
class Controller extends events_1.EventEmitter {
    constructor(id, type) {
        super();
        this._id = id;
        this._type = type;
    }
    get id() {
        return this._id;
    }
    get type() {
        return this._type;
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map