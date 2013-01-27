var Class = require('./Class.js'),

    _ = require('underscore'),

    Player = require('./Player.js'),
    
    Game = require('./Game.js'),
    
    Lobby = Class.extend({
        io: null,
        
        name: null,
        
        players: {}, // by uid
        
        readyPlayers: 0,
        
        open: true,
        
        game: null,
        
        init: function (settings) {
            this._super(settings);
            
            this.reset();
        },
        
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
                    
                    if (this.readyPlayers > 0 && this.readyPlayers == _.size(this.players)) {
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
            
            this.emit('playerList', {'players': _.pluck(this.players, 'name')});
            
            return true;
        },
        
        removePlayer: function (player) {
            console.log('removePlayer');
            
            delete this.players[player.uid];
            this.readyPlayers--;
            if (this.readyPlayers < 0) {
                this.readyPlayers = 0;
            }
            
            // Player has left an open lobby
            if (this.open) {
                this.emit('playerList', {'players': _.pluck(this.players, 'name')});
            }
            
            if (_.size(this.players) == 0) {
                this.reset();
            }
        },
        
        reset: function () {
            this.open = true;
            
            this.readyPlayers = 0;
            this.players = {};
            
            if (this.game) {
                this.game.destroy();
            }
            this.game = null;
            
            console.log('reset', this.players, _.size(this.players), this.readyPlayers);
        },
        
        startGame: function () {
            console.log('startGame');
            
            this.open = false;
            
            this.game = new Game({'io': this.io, 'lobby': this, 'players': this.players});
            
            _.each(this.players, function (player) {
                player.setGame(this.game);
            }.bind(this));
        },
        
        emit: function (eventName, eventData) {
            this.io.sockets.in(this.name).emit(eventName, eventData);
        }
    });

module.exports = Lobby;