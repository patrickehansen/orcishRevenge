const diceRoller = require('./diceRoller');

class Game {
  constructor() {
    this._characters = [];

    this._users = [];
    this._gms = [];
    this._spectators = [];
  }

  registerSocketServer(server) {
    this._socketServer = server;
  }

  addPlayer(player, character) {
    character.PossessedBy = player;

    this._users.push({
      user: player,
      type: 'player',
    });

    this._characters.push(character);

    // Notify the socket
    this._socketServer.addUser({
      PlayerName: player.Username,
      Character: character,
      Type: 'player'
    })
  }

  addSpectator(user) {
    this._users.push({
      user,
      type: 'spectator'
    });

    this._spectators.push(user);

    // Notify the socket
    this._socketServer.addUser({
      PlayerName: user.Username,
      Type: 'spectator'
    })
  }

  addGM(user) {
    this._users.push(user);
    this._gms.push(user);

    // Notify the socket
    this._socketServer.addUser({
      PlayerName: user.Username,
      Type: 'gm'
    })
  }

  removePlayer(user) {
    this._users = this._users.filter(v => v.user.Username !== user.Username);

    // Notify the socket
    this._socketServer.removeUser({
      PlayerName: user.Username,
    })
  }

  getPlayers() {
    return this._users;
  }

  getCharacters() {
    return this._characters;
  }
}

module.exports = new Game();