var Class = require('./Class.js'),
    
    _ = require('underscore'),
    
    Player = Class.extend({
        socket: null,
        
        game: null,
        
        name: '',
        
        widgets: [],
        
        task: null,
        
        init: function (settings) {
            this._super(settings);
            
            this.setName();
            
            this.socket.on('widgetChanged', function (data) {
                this.game.widgetChanged(data);
            }.bind(this));
        },
        
        setName: function () {
            var titles = ['Doctor', 'Nurse', 'Surgeon', 'Tech', 'Intern', 'Student', 'Mecha'],
                surnames = ['Johnson', 'Buck', 'Lembcke', 'Smith', 'Miyamoto', 'Kim', 'Anderson', 'Livingston', 'Roboto', 'Octopus', 'Doom', 'Goodandsexy', 'Spaceman', 'Mario', 'Robotnic', 'Manatee', 'Cleveland', 'Huxtable', 'Shepherd', 'Burke'];
            
            this.name = _.shuffle(titles)[0] + ' ' + _.shuffle(surnames)[0];
        },
        
        setGame: function (game) {
            this.game = game;
        },
        
        setWidgets: function (widgets) {
            this.widgets = widgets;
            
            var widgetData = [];
            
            _.each(this.widgets, function (widget) {
                widgetData.push(widget.getData());
            }.bind(this));
            
            this.socket.emit('loadWidgets', widgetData);
        },
        
        hasTask: function () {
            return !!this.task;
        },
        
        // NOTE: this player may not be able to complete this task directly... this is just what is displayed on their screen that they have to yell out
        setTask: function (task) {
            this.task = task;
            
            this.socket.emit('task', task);
        },
        
        clearTask: function () {
            this.task = null;
        }
    });

module.exports = Player;