"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerController = void 0;
const controller_1 = require("./controller");
class PlayerController extends controller_1.Controller {
    constructor(id, account) {
        super(id, 'player');
        this._account = account;
    }
    possess(character) {
        this._character = character;
    }
    get character() {
        return this._character;
    }
    get account() {
        return this._account;
    }
}
exports.PlayerController = PlayerController;
//# sourceMappingURL=playerController.js.map