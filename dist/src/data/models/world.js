"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Points = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const level_1 = require("./level");
exports.Points = new mongoose_1.default.Schema({
    Levels: [level_1.Level]
});
//# sourceMappingURL=world.js.map