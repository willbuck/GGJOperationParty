var socket = io.connect(window.location.hostname);
var GameStates = (function(socket) {
    var joinGame = function(lobbyName) {
        // Join a named lobby
        console.log('Joining game: ' + lobbyName);
        socket.emit('join', {lobby: lobbyName});
    };
    return {
        loadStartScreen: function() {
            TemplateUtil.loadGameScreen('selectGameScreen', {lobbies: [{gameID: 1, name: 'test'}]});
            $('.modalDialog').addClass('active');
            $('.gameSelect').on('touch click', function(e) {
                console.log('Selecting game: ' + e.toElement.value);
                joinGame(e.toElement.value);
            });
        },
        loadLobbyScreen: function(players) {
            TemplateUtil.loadGameScreen('lobbyScreen', {
                lobby: {name: 'test'},
                players: players
            });
            $('.startGame').on('touch click', function(e) {
                console.log('Time to Start!');
                // When you are ready, tell the lobby (when everybody in the lobby is ready the game starts)
                socket.emit('ready');
                $('.modalDialog').removeClass('active');
                TemplateUtil.loadWidget(setupButtonPushOn);
                HeartBeatAudio.play();
            });
        }
    }
})(socket);


