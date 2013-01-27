var Class = require('./Class.js'),
    
    _ = require('underscore'),
    
    Widget = Class.extend({
        name: '',
        
        data: {},
        
        getData: function () {
            return {'name': this.name, 'data': this.data};
        }
    });

    var widgetTypes = [
            {name: 'buttonWidget', data: {controlName: 'Heart', controlAction: 'Pump'}},
            {name: 'buttonWidget', data: {controlName: 'Food', controlAction: 'Digest'}},
            {name: 'buttonWidget', data: {controlName: 'Lungs', controlAction: 'Engage'}},
            {name: 'buttonWidget', data: {controlName: 'Funny Bone', controlAction: 'Tickle'}},
            {name: 'buttonWidget', data: {controlName: 'Gas', controlAction: 'Vent'}},
            {name: 'buttonWidget', data: {controlName: 'Toes', controlAction: 'Twinkle'}}
        ];
    
    Widget.getRandomSet = function (numPlayers, widgetsPerPlayer) {
        _.shuffle(widgetTypes);
        
        var i,
            playerWidgets = []; // becomes an array of arrays... player # -> array of player widgets
        
        // Unique set of non-duplicated widgets for each player
        for (i = 0; i < numPlayers; i++) {
            _.shuffle(widgetTypes);
            
            playerWidgets[i] = [];
            
            _.each(widgetTypes.slice(0, widgetsPerPlayer), function (settings) {
                playerWidgets[i].push(new Widget(settings));
            });
        }
        
        return playerWidgets;
    };

module.exports = Widget;