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
exports.getGames = void 0;
const gameManager_1 = __importDefault(require("../game/gameManager"));
function getGames() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.info('##gameService::#getGames::starting execution');
            const result = yield gameManager_1.default.getGames();
            console.info('##gameService::#getGames::successful execution');
            return result;
        }
        catch (err) {
            console.error('##gameService::#getGames::error', err);
            throw err;
        }
    });
}
exports.getGames = getGames;
//# sourceMappingURL=games.js.map