"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const points_1 = require("./points");
const modifier_1 = require("./modifier");
exports.Status = new mongoose_1.default.Schema({
    HitPoints: points_1.Points,
    MagicPoints: points_1.Points,
    ActionPoints: points_1.Points,
    CraftingPoints: points_1.Points,
    Modifiers: [modifier_1.Modifier]
});
//# sourceMappingURL=status.js.map