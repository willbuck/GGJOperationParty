var Class = require('./Class.js'),
    
    _ = require('underscore'),
    
    Player = Class.extend({
        socket: null,
        
        name: '',
        
        widgets: [],
        
        init: function (settings) {
            this._super(settings);
            
            this.setName();
        },
        
        setName: function () {
            var titles = ['Doctor', 'Nurse', 'Surgeon', 'Tech', 'Intern', 'Student'],
                surnames = ['Johnson', 'Buck', 'Lembcke', 'Smith', 'Miyamoto', 'Kim', 'Anderson', 'Livingston', 'Roboto', 'Octopus', 'Doom', 'Goodandsexy', 'Spaceman', 'Mario', 'Robotnic', 'Manatee'];
            
            this.name = _.shuffle(titles)[0] + ' ' + _.shuffle(surnames)[0];
        },
        
        setWidgets: function (widgets) {
            this.widgets = widgets;
            
            var widgetData = [];
            
            _.each(this.widgets, function (widget) {
                widgetData.push(widget.getData());
            }.bind(this));
            
            this.socket.emit('loadWidgets', widgetData);
        }
    });

module.exports = Player;