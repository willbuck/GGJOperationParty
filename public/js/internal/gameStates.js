// By default the widgets are at half size
widgetInputScale = $(window).height() >= 700 ? 1 : 2;

window.addEventListener('load', function () {
    setTimeout(function () {
        window.scrollTo(0, 0);
    }, 1);
}, false);

var socket = io.connect(window.location.hostname);
var GameStates = (function(socket) {
    var myLobby,
        joinGame = function(lobbyName) {
            // Join a named lobby
            console.log('Joining game: ' + lobbyName);
            socket.emit('join', {lobby: lobbyName});
            myLobby = lobbyName;
        };
    
    return {
        loadStartScreen: function (lobbies) {
            TemplateUtil.loadGameScreen('selectGameScreen', {lobbies: lobbies});
            $('.modalDialog').addClass('active');
            $('.gameSelect').on('touch click', function(e) {
                console.log('Selecting game: ' + e.toElement.value);
                $('.gameSelect').hide();
                joinGame(e.toElement.value);
            });
        },
        loadLobbyScreen: function (players) {
            TemplateUtil.loadGameScreen('lobbyScreen', {
                lobby: {name: myLobby},
                players: players
            });
            
            $('.startGame').on('touch click', function(e) {
                // When you are ready, tell the lobby (when everybody in the lobby is ready the game starts)
                socket.emit('ready');
                
                $('.startGame').hide();
                $('#waitingMsg').show();
                
                //TemplateUtil.loadWidget(setupButtonPushOn);
                HeartBeatAudio.play();
            });
        },
        playGame: function () {
            $('.modalDialog').removeClass('active');
        },
        restartGame: function(lobbies) {
            // TODO need to refresh lobbies list here
            setTimeout(function() {
                GameStates.loadStartScreen(lobbies);
            }, 4000); // About 4 seconds to start a new game?
        }
    }
})(socket);


