var SharedClass = require('../public/shared/Class.js'),
    
    _ = require('underscore'),
    
    // Should be unique across all classes
    lastUID = 0,
    
    ServerClass = SharedClass.extend({
        uid: null,
        
        io: null,
        
        init: function (settings) {
            _.extend(this, settings);
            
            this.uid = this.getUID();
        },
        
        getUID: function () {
            lastUID++;
            
            return lastUID;
        }
    });

module.exports = ServerClass;