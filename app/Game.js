var Class = require('./Class.js'),
    
    _ = require('underscore'),
    
    Widget = require('./Widget.js'),
    
    Game = Class.extend({
        lobby: null,
        
        players: {},
        
        taskInterval: null,
        
        widgetsPerPlayer: 4,
        
        // Array of Arrays of Widgets (each player has a set of widgets)
        // These are all the current Widgets in this game
        playerWidgets: [],
        
        init: function (settings) {
            this._super(settings);
            
            this.lobby.emit('play');
            
            // Get the set of all the widgets that are going to be in this game
            this.playerWidgets = Widget.getRandomSet(_.size(this.players), this.widgetsPerPlayer);
            
            console.log('playerWidgets', this.playerWidgets);
            
            // Asign widgets to players
            var i = 0;
            _.each(this.players, function (player) {
                player.setWidgets(this.playerWidgets[i]);
                i++;
            }.bind(this));

            // For now I'm sending dummy tasks to all players every 5 seconds
            // TODO: improve me?
            this.taskInterval = setInterval(this.assignRandomTasks.bind(this), 5000);
        },
        
        assignRandomTasks: function () {
            // Wouldn't necessarily need to assign every player a new task every time... could pick random players
            _.each(this.players, function (player) {
                // Task could be from *any* player's set of widgets (that's the fun of the game)
                player.socket.emit('task', {'name': 'value'});
            });
        },
        
        // Call when you are going to destroy a game
        end: function () {
            clearInterval(this.taskInterval);
        }
    });

module.exports = Game;