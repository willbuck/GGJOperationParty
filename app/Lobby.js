var Class = require('./Class.js'),

    Player = require('./Player.js'),
    
    Lobby = Class.extend({
        players: {},
        
        addPlayer: function (socket, data) {
            console.log('addPlayer');
            
            var player = new Player();
            
            this.players[player.uid] = player;
            
            // Handle disconnects
            socket.on(
                'disconnect',
                function () {
                    this.removePlayer(player);
                }.bind(this)
            );
        },
        
        removePlayer: function (player) {
            console.log('removePlayer');
            
            delete this.players[player.uid];
        }
    });

module.exports = Lobby;