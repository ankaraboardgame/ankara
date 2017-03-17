const Lobby = function () {

  const users = [];
  const invitations = [];

  function LobbyUser(id) {
    this.id = id;
    this.isPlaying = false;
  }

  function getLobbyState() {
    return {users: users, invitations: invitations};
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
