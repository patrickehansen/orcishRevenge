"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const like = new mongoose_1.default.Schema({
    Title: String,
    Description: String,
});
const rpAttribs = new mongoose_1.default.Schema({
    Height: String,
    Weight: String,
    EyeColor: String,
    HairColor: String,
    SkinColor: String,
    Build: String,
    Age: Number,
    GeneralNotes: String,
    // RP Personality descriptors
    Dislikes: [like],
    Likes: [like],
    Vices: [like],
});
//# sourceMappingURL=rpAttributes.js.map