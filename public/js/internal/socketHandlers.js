console.log('Loading Socket.io connection');

//var socketEndpointUrl = environment.dev ? 'http://localhost' : 'http://ggj-2013-operation-party.herokuapp.com/';
var socketEndpointUrl = 'http://localhost';
var GameData = {
        joined : false,
        players : []
    },
    socket = io.connect(window.location.hostname);

// Get named lobbies
socket.on('lobbies', function (data) {
    if (GameData.joined) {
        return;
    }
    GameStates.loadStartScreen();

    // You joined your lobby successfully
    socket.on('joined', function () {
        if (GameData.joined) {
            return;
        }

        console.log('Joined');
        GameData.joined = true;
        // Every time a new player joins the lobby we get a list of *all* current players
        socket.on('playerList', function (data) {
            console.log(data.players);
            GameData.players = data.players;
            loadGameScreen('lobbyScreen', {
                lobby: {name: 'test'},
                players: GameData.players
            });
            $('.startGame').on('touch click', function(e) {
                console.log('Time to Start!');
                // When you are ready, tell the lobby (when everybody in the lobby is ready the game starts)
                socket.emit('ready');
                $('.modalDialog').removeClass('active');
            });
        });
    });

    // Hey the game started!
    socket.on('play', function () {
        console.log('play!');
    });

    socket.on('task', function (data) {
        console.log('Task came with data: ' + data);
    });

    socket.on('loadWidgets', function(data) {
        console.log('Loading and inserting templates: ' + data);
        _.each(data.widgets, function(widget) {
            console.log('Inserting ' + widget.name + ' at ' + widget.destination + ' with controlName ' + widget.data.controlName);
            loadWidget(widget.name, widget.destination, widget.data);
        });
    });

    socket.on('disconnect', function () {
        socket.disconnect();
    });
});