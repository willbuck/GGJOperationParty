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
        
        GameStates.loadStartScreen(data.lobbies);

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
            // Actually probably don't have any action to take with this event... we're really going to start playing after we get our loadWidgets event!
        });

        socket.on('task', function (data) {
            console.log('Task came with data: ', data);
            
            // Testing: auto-play the next move to win
            //data.value = data.requiredValue;
            //socket.emit('widgetChanged', data);
        });

        socket.on('loadWidgets', function (data) {
            console.log('Loading and inserting templates: ', data);
            
            var i = 1;
            _.each(data, function (widget) {
                TemplateUtil.loadWidget('#widget' + i, widget);
                i++;
            });
            
            GameStates.playGame();
        });

        socket.on('disconnect', function () {
            socket.disconnect();
        });
    });
    
})();
