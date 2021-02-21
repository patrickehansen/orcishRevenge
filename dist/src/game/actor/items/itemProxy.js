"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemProxy = void 0;
const actor_1 = require("../actor");
class ItemProxy extends actor_1.Actor {
    constructor(id, item) {
        super(id);
        this._item = item;
    }
    take() {
        this.destroy();
        return this._item;
    }
}
exports.ItemProxy = ItemProxy;
//# sourceMappingURL=itemProxy.js.map