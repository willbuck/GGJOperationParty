var SocketHandlers = (function() {
    
    console.log('Loading Socket.io connection');

    var GameData = {
            joined : false,
            players : []
        };

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
                GameStates.loadLobbyScreen(GameData.players);
            });
        });

        // Hey the game started!
        socket.on('play', function () {
            console.log('play!');
        });

        socket.on('task', function (data) {
            console.log('Task came with data: ', data);
            
            // TODO: don't auto-play the next move, obviously
            //data.value = data.requiredValue;
            //socket.emit('widgetChanged', data);
        });

        socket.on('loadWidgets', function(data) {
            console.log('Loading and inserting templates: ', data);
            _.each(data.widgets, function(widget) {
                console.log('Inserting ' + widget.name + ' at ' + widget.destination + ' with controlName ' + widget.data.controlName);
                loadWidget(widget.name, widget.destination, widget.data);
            });
        });

        socket.on('disconnect', function () {
            socket.disconnect();
        });
    });
    
})();
