var Class = require('./Class.js'),

    _ = require('underscore'),

    Player = require('./Player.js'),
    
    Game = require('./Game.js'),
    
    Lobby = Class.extend({
        io: null,
        
        name: null,
        
        players: {},
        
        readyPlayers: 0,
        
        open: true,
        
        game: null,
        
        addPlayer: function (socket, data) {
            if (!this.open) {
                return false;
            }
            
            console.log('addPlayer');
            
            var player = new Player({'socket': socket});
            
            this.players[player.uid] = player;
            
            // Handle disconnects
            socket.on(
                'ready',
                function () {
                    this.readyPlayers++;
                    
                    if (this.readyPlayers == _.size(this.players)) {
                        this.startGame();
                    }
                }.bind(this)
            );
            
            // Handle disconnects
            socket.on(
                'disconnect',
                function () {
                    socket.leave(this.name);
                    this.removePlayer(player);
                }.bind(this)
            );
            
            socket.join(this.name);
            
            socket.emit('joined');
            
            return true;
        },
        
        removePlayer: function (player) {
            console.log('removePlayer');
            
            delete this.players[player.uid];
        },
        
        startGame: function () {
            console.log('startGame');
            
            this.open = false;
            
            this.game = new Game({'lobby': this, 'players': this.players});
        },
        
        emit: function (eventName, eventData) {
            this.io.sockets.in(this.name).emit(eventName, eventData);
        }
    });

module.exports = Lobby;