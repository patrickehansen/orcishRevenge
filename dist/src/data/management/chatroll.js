"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetChatHistory = exports.AddChatHistory = void 0;
const database_1 = __importDefault(require("../database"));
function AddChatHistory(chat) {
    return __awaiter(this, void 0, void 0, function* () {
        if (chat.Type === 'chat') {
            yield database_1.default.ChatHistory.create(chat);
        }
        else if (chat.Type === 'roll') {
            const roll = {
                Sent: chat.Sent,
                Sender: chat.Sender,
                Dice: chat.Roll.dice,
                Size: chat.Roll.size,
                Count: chat.Roll.count,
                Operator: chat.Roll.operator,
                Post: chat.Roll.post,
                Raw: chat.Roll.raw,
                Total: chat.Roll.total,
            };
            yield database_1.default.RollHistory.create(roll);
        }
    });
}
exports.AddChatHistory = AddChatHistory;
function GetChatHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        const chats = yield database_1.default.ChatHistory.find({}).catch(error => {
            console.error('Error in chatHistory.find', error);
            throw error;
        });
        const rolls = yield database_1.default.RollHistory.find({}).catch(error => {
            console.error('Error in rollHistory.find', error);
            throw error;
        });
        return chats.concat(rolls).map(v => v.toMessage());
    });
}
exports.GetChatHistory = GetChatHistory;
//# sourceMappingURL=chatroll.js.map