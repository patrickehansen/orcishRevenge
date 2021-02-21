"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const account_1 = require("./models/account");
const chatHistory_1 = require("./models/chatHistory");
const rollHistory_1 = require("./models/rollHistory");
const character_1 = require("./models/character");
const notepad_1 = require("./models/notepad");
mongoose_1.default.connect(config_1.default.mongoUrl, { useNewUrlParser: true });
const db = mongoose_1.default.connection;
const exporting = {
    Ready: false,
    Connection: db,
};
db.on('error', (error) => {
    console.error('Mongoose error', error);
});
db.once('open', () => {
    console.log('Mongo connection opened!');
    exporting.Account = account_1.Accounts;
    exporting.Character = character_1.Characters;
    exporting.ChatHistory = chatHistory_1.ChatHistory;
    exporting.RollHistory = rollHistory_1.RollHistory;
    exporting.Notepads = notepad_1.Notepads;
    exporting.Ready = true;
});
exports.default = exporting;
//# sourceMappingURL=database.js.map