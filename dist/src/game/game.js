"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameServer = void 0;
const events_1 = require("events");
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("../config"));
class GameServer extends events_1.EventEmitter {
    constructor({ id, name, state, mode, world, lobby }) {
        super();
        this._playing = false;
        this._id = id || uuid_1.v4();
        this._name = name;
        this._gameState = state;
        this._gameMode = mode;
        this._gameWorld = world;
        this._lobby = lobby;
    }
    set socketServer(server) {
        this._lobby.socketServer = server;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get image() {
        return this._icon;
    }
    get playerCount() {
        return this._lobby.getPlayers().length;
    }
    get ongoing() {
        return this._lobby.getPlayers().length > 1 || this._playing;
    }
    beginPlay() {
        this._playing = true;
        this.emit('beginPlay');
        this._timer = setInterval(this.tick, config_1.default.tickRate);
    }
    endPlay() {
        this._playing = false;
        this.emit('endPlay');
        clearInterval(this._timer);
    }
    tick() {
        this.processInput();
        this.update();
        this.serialize();
    }
    processInput() { }
    update() { }
    serialize() { }
}
exports.GameServer = GameServer;
//# sourceMappingURL=game.js.map