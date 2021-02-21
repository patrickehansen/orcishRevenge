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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const socket_io_1 = __importDefault(require("socket.io"));
const auto_bind_1 = __importDefault(require("auto-bind"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const dataManager = __importStar(require("../data/dataManager"));
//import dataManager from '../data/dataManager';
const roller = __importStar(require("../game/diceRoller"));
const gameManager_1 = __importDefault(require("../game/gameManager"));
const config_1 = __importDefault(require("../config"));
class SocketServer extends events_1.EventEmitter {
    constructor(listener) {
        super();
        auto_bind_1.default(this);
        this.users = [];
        if (listener) {
            // Under normal conditions, Hapi will provide the listener
            this.server = socket_io_1.default(listener);
        }
        else {
            // Under testing conditions, we need to listen ourselves
            this.server = socket_io_1.default.listen(5000);
        }
        this.chat = this.server.of('/chat');
        this.connections = [];
        // The root namespace handler
        this.server.on('connection', this.handleConnection);
        // Chat namespace handler
        this.chat.on('connection', this.handleChatConnection);
        gameManager_1.default.socketServer = this;
        console.log('Socket server listening..');
    }
    handleChatConnection(client) {
        console.log('chat connection!');
        client.on('disconnect', this.handleChatDisconnection);
    }
    handleSubscribe(client, data) {
        console.log('subscribe', data);
    }
    handleRoomMessage(client, data) {
        this.server.to(data.room).emit('roomMessage', data.message);
    }
    handleConnection(client) {
        this.connections.push(client);
        console.log(`Socket: client connected: ${this.connections.length} sockets connected.`);
        client.on('disconnect', this.handleDisconnect);
        client.on('register', (data) => { this.registerClient(client, data); });
        client.on('chat', (data) => { this.chatMessage(client, data); });
        client.on('roll', (data) => { this.rollMessage(client, data); });
        client.on('room', (data) => { this.handleRoomMessage(client, data); });
    }
    registerClient(client, data) {
        const room = client.handshake.address;
        client.join(room);
        client.emit('roomInfo', room);
        this.server.to(room).emit('roomMessage', { type: 'join', data: data.id });
        if (!data.token)
            return;
        try {
            let decoded = jsonwebtoken_1.default.verify(data.token, config_1.default.secret);
            if (!decoded) {
                client.disconnect();
            }
            client.Username = decoded.username;
            console.log(`User ${decoded.username} registered.`);
            this.server.sockets.emit('chat', {
                Type: 'chat',
                Sent: moment_1.default(),
                Message: `${decoded.username} has joined the game.`
            });
        }
        catch (error) {
            console.error('Error in register client', error);
        }
    }
    rollMessage(client, data) {
        console.log(`Roll message received:`, client.Username, data);
        const user = this.users.find(v => v.PlayerName === client.Username);
        if (!user)
            return;
        let result;
        if (data.type === 'stat') {
            result = roller.rollStat(data.roll, user ? user.Character : null);
        }
        else if (data.type === 'macro') {
            result = roller.rollMacro(data.roll, user ? user.Character : null);
        }
        const outgoing = {
            Sender: client.Username,
            Sent: data.sent,
            Roll: result,
            Type: 'roll',
        };
        dataManager.AddChatHistory(outgoing);
        this.server.sockets.emit('chat', outgoing);
    }
    chatMessage(client, data) {
        console.log(`Chat message: ${data.message} from ${client.Username}`);
        let type;
        let message = data.message;
        let outgoing = {};
        if (data.message[0] === '/') {
            //command
            if (data.message.slice(0, 4) === '/me ') {
                outgoing = {
                    Sender: client.Username,
                    Message: data.message,
                    Sent: data.sent,
                    Type: 'emote',
                };
            }
            else if (data.message.slice(0, 6) === '/roll ') {
                const roll = roller.roll(data.message);
                outgoing = {
                    Sender: client.Username,
                    Roll: roll,
                    Sent: data.sent,
                    Type: 'roll',
                };
            }
        }
        else {
            outgoing = {
                Sender: client.Username,
                Message: data.message,
                Sent: data.sent,
                Type: 'chat',
            };
        }
        dataManager.AddChatHistory(outgoing);
        this.server.sockets.emit('chat', outgoing);
    }
    // onJoin(...args) {
    //   return;
    // }
    handleDisconnect(reason) {
        //Disconnect
        console.log('disconnected', reason);
        const usernames = Object.values(this.server.sockets.connected).map((v) => v.Username);
        const foundIndex = this.connections.findIndex(v => !usernames.includes(v.Username));
        const found = this.connections[foundIndex];
        if (found && found.Username) {
            this.server.sockets.emit('chat', {
                Type: 'chat',
                Sent: moment_1.default(),
                Message: `${found.Username} has disconnected.`
            });
        }
        this.connections.splice(foundIndex, 1);
        console.log(`Socket: client disconnected: ${this.connections.length} sockets connected.`);
    }
    handleChatDisconnection(client) {
        console.log('chat disconnect');
    }
    addUser(user) {
        this.users.push(user);
        this.server.sockets.emit('addUser', user);
    }
    removeUser(user) {
        this.users = this.users.filter(v => v.PlayerName !== user.PlayerName);
        this.server.sockets.emit('removeUser', user);
    }
}
exports.default = SocketServer;
//# sourceMappingURL=socketServer.js.map