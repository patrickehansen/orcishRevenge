"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollHistory = exports.rollHistorySchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.rollHistorySchema = new mongoose_1.Schema({
    id: String,
    Sent: { type: Date, default: Date.now },
    Sender: String,
    Dice: [Number],
    Size: Number,
    Count: Number,
    Operator: String,
    Post: String,
    Raw: String,
    Total: Number,
});
exports.RollHistory = mongoose_1.default.model('RollHistory', exports.rollHistorySchema);
// rollHistorySchema.methods.toMessage = function() {
//   return {
//     Sender: this.Sender,
//     Roll: {
//       dice: this.Dice,
//       sum: this.Dice.reduce((a,b) => a+b,0),
//       count : this.Count,
//       size: this.Size,
//       post : this.Post,
//       operator : this.Operator,
//       raw: this.Raw,
//       total: this.Total,
//     },
//     Sent: this.Sent,
//     Type: 'roll',
//   }
// }
//# sourceMappingURL=rollHistory.js.map