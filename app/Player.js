var Class = require('./Class.js'),
    
    _ = require('underscore'),
    
    Player = Class.extend({
        name: '',
        
        init: function (settings) {
            this._super(settings);
            
            this.setName();
        },
        
        setName: function () {
            var titles = ['Doctor', 'Nurse', 'Surgeon', 'Tech', 'Intern', 'Student'],
                surnames = ['Johnson', 'Buck', 'Lembcke', 'Smith', 'Miyamoto', 'Kim', 'Anderson', 'Livingston', 'Roboto', 'Octopus', 'Doom', 'Goodandsexy', 'Spaceman', 'Mario', 'Robotnic', 'Manatee'];
            
            this.name = _.shuffle(titles)[0] + ' ' + _.shuffle(surnames)[0];
        }
    });

module.exports = Player;