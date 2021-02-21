"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const item = new mongoose_1.Schema({
    Quantity: Number,
    Name: String,
    Effect: String,
    Armor: String,
    Damage: String,
    Notes: String,
});
const itemSection = new mongoose_1.Schema({
    SectionName: String,
    Placement: String,
    Items: [item],
});
//# sourceMappingURL=item.js.map