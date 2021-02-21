"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const item_1 = require("./item");
class Container extends item_1.Item {
    constructor() {
        super();
        this._items = {};
    }
    add(item) {
        this._items[item.id] = item;
    }
    get(id) {
        return this._items[id];
    }
    remove(id) {
        const item = this._items[id];
        delete this._items[id];
        return item;
    }
    getItems() {
        return Object.values(this._items);
    }
}
exports.Container = Container;
//# sourceMappingURL=container.js.map