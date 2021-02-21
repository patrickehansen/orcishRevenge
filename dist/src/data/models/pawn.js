"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.Pawn = new mongoose_1.default.Schema({
    Uuid: String,
    Current: Number,
    Total: Number,
});
//# sourceMappingURL=pawn.js.map