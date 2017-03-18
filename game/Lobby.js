const Lobby = function () {

  const users = [];

  function LobbyUser(id) {
    this.id = id;
    this.isPlaying = false;
  }

  function getLobbyState() {
    return {users: users};
  }

  // function findUser(id) {
  //   return _.find(users, {id: id});
  // }

  this.getLobbyState = function () {
    return getLobbyState();
  };

  this.enterLobby = function (username) {
    // join lobby
    var user = new LobbyUser(username);
    users.push(user);

  }
}

module.exports = Lobby;
