"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ms_1 = __importDefault(require("ms"));
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
dotenv_safe_1.default.config();
exports.default = {
    secret: process.env.SECRET,
    host: process.env.HOST,
    port: Number(process.env.PORT),
    mode: process.env.MODE,
    mongoUrl: process.env.MONGO_URL,
    tokenExpiration: ms_1.default(process.env.TOKEN_EXPIRATION),
    tickRate: Number(process.env.TICK_RATE),
};
//# sourceMappingURL=config.js.map