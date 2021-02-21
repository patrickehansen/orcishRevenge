"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modifier = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.Modifier = new mongoose_1.default.Schema({
    RemainingTurns: Number,
    Affects: String,
});
//# sourceMappingURL=modifier.js.map