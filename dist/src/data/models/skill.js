"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const skill = new mongoose_1.default.Schema({
    Name: String,
    Score: Number,
    MPCost: Number,
    APCost: Number,
    Damage: String,
    Notes: String,
});
const skillSection = new mongoose_1.default.Schema({
    SectionName: String,
    Placement: String,
    Skills: [skill],
});
//# sourceMappingURL=skill.js.map