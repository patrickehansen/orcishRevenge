"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stats = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.Stats = new mongoose_1.default.Schema({
    END: Number,
    STR: Number,
    AGI: Number,
    RES: Number,
    MAG: Number,
    ALT: Number,
    INT: Number,
    SPD: Number,
    MEL: Number,
    ACC: Number,
});
//# sourceMappingURL=stats.js.map