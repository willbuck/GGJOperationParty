var GameStates = (function() {
    var joinGame = function(lobbyName) {
        // Join a named lobby
        console.log('Joining game: ' + lobbyName);
        socket.emit('join', {lobby: lobbyName});
    };
    return {
        loadStartScreen: function() {
            loadGameScreen('selectGameScreen', {lobbies: [{gameID: 1, name: 'test'}]});
            $('.modalDialog').addClass('active');
            $('.gameSelect').on('touch click', function(e) {
                console.log(e);
                joinGame(e.toElement.value);
            });
        },
        loadLobbyScreen: function() {

        }
    }
})();


