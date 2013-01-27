var Class = require('./Class.js'),
    
    _ = require('underscore'),
    
    Game = Class.extend({
        lobby: null,
        
        players: null,

        availableWidgets: {
            widgets: [
                {name: 'buttonWidget', destination: '#widget1', data: {controlName: 'Heart', controlAction: 'Pump'}},
                {name: 'buttonWidget', destination: '#widget2', data: {controlName: 'Food', controlAction: 'Digest'}},
                {name: 'buttonWidget', destination: '#widget3', data: {controlName: 'Lungs', controlAction: 'Engage'}},
                {name: 'buttonWidget', destination: '#widget4', data: {controlName: 'Funny Bone', controlAction: 'Tickle'}}
            ]
        },

        taskInterval: null,
        
        assignWidgets: function() {
            //TODO this should randomize who gets what, but for now just giving out data
            return this.availableWidgets;
        },
        
        init: function (settings) {
            var that = this;
            this._super(settings);
            
            this.lobby.emit('play');
            
            _.each(this.players, function (player) {
                player.socket.emit('loadWidgets', that.assignWidgets());
            });

            this.taskInterval = setInterval(this.assignRandomTasks.bind(this), 5000);
        },
        
        assignRandomTasks: function () {
            _.each(this.players, function (player) {
                player.socket.emit('task', {'name': 'value'});
            });
        },
        
        end: function () {
            clearInterval(this.taskInterval);
        }
    });

module.exports = Game;