const Lobby = require('./Lobby')


module.exports = function(io, gameService) {

  const lobby = new Lobby();
  // const games;

  this.start = function() {
    io.on('connection', socket => {

      lobby.enterLobby('a user');
      // socket.emit()

    })
  }
}
