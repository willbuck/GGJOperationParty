var Class = require('../public/shared/Class.js'),
    
    Game = Class.extend({
        io: null,
        
        init: function (io) {
            this.io = io;
            

        }
    });

module.exports = Game;