var Class = require('./Class.js'),
    
    _ = require('underscore'),
    
    Game = Class.extend({
        lobby: null,
        
        players: null,
        
        init: function (settings) {
            this._super(settings);
            
            this.lobby.emit('play');
            
            setInterval(this.assignRandomTasks.bind(this), 5000);
        },
        
        assignRandomTasks: function () {
            _.each(this.players, function (player) {
                player.socket.emit('task', {'name': 'value'});
            });
        }
    });

module.exports = Game;