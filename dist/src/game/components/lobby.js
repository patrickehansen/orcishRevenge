"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lobby = void 0;
const events_1 = require("events");
class Lobby extends events_1.EventEmitter {
    constructor(saveData) {
        super();
        this._controllers = {
            players: {},
            gms: {},
            spectators: {},
        };
    }
    set socketServer(server) {
        this._socketServer = server;
    }
    getPlayers() {
        return Object.values(this._controllers.players);
    }
    addUser(controller) {
        this[`_${controller.type}s`][controller.id] = controller;
        this.emit('userJoined', controller);
        // Notify the socket
        this._socketServer.addUser(controller);
    }
    removeUser(controller) {
        this[`_${controller.type}s`][controller.id] = undefined;
        // Notify the socket
        this._socketServer.removeUser(controller);
    }
}
exports.Lobby = Lobby;
//# sourceMappingURL=lobby.js.map