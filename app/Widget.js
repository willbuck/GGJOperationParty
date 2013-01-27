var Class = require('./Class.js'),
    
    _ = require('underscore'),
    
    Widget = Class.extend({
        type: '',
        
        name: '',
        
        action: '',
        
        init: function (settings) {
            this._super(settings);
        },
        
        // For sending player their widgets
        // Also base for task data
        getData: function () {
            var data = {},
                keys = ['type', 'name', 'action'];
            
            _.each(keys, function (key) {
                data[key] = this[key];
            }.bind(this));
            
            data.wuid = this.uid;
            
            return data;
        },
        
        // For sending players their tasks
        getTask: function () {
            var data = this.getData();
            
            // TODO: come up with a required value
            // NOTE: can't pre-generate all tasks if we want to store current value / required value in Widget... we'd either need to generate-as-we-go or store the task states here in the widget
            data.requiredValue = this.action;
            
            return data;
        }
    });


    var availableWidgets = [
            {type: 'pump', name: 'Lungs', action: 'Pump'},
            {type: 'chestIncision', name: 'Chest', action: 'Sew'},
            {type: 'chargeDefibrilator', name: 'Defibrilator', action: 'Charge'},
            {type: 'buttonMomentary', name: 'Gas', action: 'Vent'}/*,
            {type: 'buttonPushOn', name: 'Heart', action: 'Pump'},
            {type: 'buttonPushOn', name: 'Food', action: 'Digest'},
            {type: 'buttonPushOn', name: 'Funny Bone', action: 'Tickle'},
            {type: 'buttonPushOn', name: 'Toes', action: 'Twinkle'}*/
        ];
    
    
    Widget.getRandomSet = function (numPlayers, widgetsPerPlayer) {
        var i,
            playerWidgets = []; // becomes an array of arrays... player # -> array of player widgets
        
        // Unique set of non-duplicated widgets for each player
        for (i = 0; i < numPlayers; i++) {
            availableWidgets = _.shuffle(availableWidgets);
            
            playerWidgets[i] = [];
            
            _.each(availableWidgets.slice(0, widgetsPerPlayer), function (settings) {
                playerWidgets[i].push(new Widget(settings));
            });
            
            console.log('playerWidgets', playerWidgets[i]);
        }
        
        return playerWidgets;
    };

module.exports = Widget;