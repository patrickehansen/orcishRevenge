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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameFactory = void 0;
const events_1 = require("events");
const game_1 = require("./game");
const dataManager = __importStar(require("../data/dataManager"));
const gameState_1 = require("./components/gameState");
const gameMode_1 = require("./components/gameMode");
const lobby_1 = require("./components/lobby");
const worldFactory_1 = require("./world/worldFactory");
class GameFactory extends events_1.EventEmitter {
    constructor() {
        super();
        this._games = {};
    }
    set socketServer(server) {
        this._socketServer = server;
    }
    buildGameFromSave(saveData) {
        const game = new game_1.GameServer({
            id: saveData.id,
            name: saveData.name,
            state: new gameState_1.GameState(saveData.state),
            mode: new gameMode_1.GameMode(saveData.mode),
            lobby: new lobby_1.Lobby(saveData.lobby),
            world: worldFactory_1.WorldFactory.buildWorld(saveData.world),
        });
        const id = game.id;
        this._games[id] = game;
        return game;
    }
    buildNewGame(name) {
        const game = new game_1.GameServer({
            id: undefined,
            name: name,
            state: new gameState_1.GameState(),
            mode: new gameMode_1.GameMode(),
            lobby: new lobby_1.Lobby(),
            world: worldFactory_1.WorldFactory.buildWorld(),
        });
        const id = game.id;
        this._games[id] = game;
        return game;
    }
    buildGame(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const saveData = yield dataManager.getGame(id);
            return this.buildGameFromSave(saveData);
        });
    }
    getGame(id) {
        return this._games[id];
    }
    getGames() {
        return Object.values(this._games).map(v => ({
            id: v.id,
            name: v.name,
            ongoing: v.ongoing,
            playerCount: v.playerCount,
            image: v.image,
        }));
    }
    startGame(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = this._games[id];
            game.beginPlay();
            return game;
        });
    }
    endGame(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = this._games[id];
            game.endPlay();
            return game;
        });
    }
}
exports.GameFactory = GameFactory;
exports.default = new GameFactory();
//# sourceMappingURL=gameManager.js.map