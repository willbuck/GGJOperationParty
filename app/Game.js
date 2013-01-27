var Class = require('./Class.js'),
    
    _ = require('underscore'),
    
    Widget = require('./Widget.js'),
    
    // Note: Game is essentially the Patient... you can think of a game as a new patient
    Game = Class.extend({
        io: null,
        
        lobby: null,
        
        players: {}, // by uid
        
        gameTimer: null,
        
        widgetsPerPlayer: 4,
        
        // These are all the current Widgets in this game
        widgets: {}, // by uid
        
        // These are all the things that still need to be assigned to be completed
        laterTasks: [],
        
        // These are the assigned tasks that need to be completed now
        nowTasks: [],
        
        init: function (settings) {
            this._super(settings);
            
            this.lobby.emit('play');
            
            this.assignWidgets();
            
            this.createTasks(_.size(this.players)); // TODO... how many tasks?
            
            this.assignTasks();
            
            this.startTimer(30);
        },
        
        startTimer: function (seconds) {
            this.gameTimer = setTimeout(function () {
                this.lose();
            }.bind(this), seconds * 1000);
        },
        
        assignWidgets: function () {
            // Get the set of all the widgets that are going to be in this game, separated by player
            var playerWidgets = Widget.getRandomSet(_.size(this.players), this.widgetsPerPlayer),
                allWidgets = _.flatten(playerWidgets, true);
            
            this.widgets = {};
            _.each(allWidgets, function (widget) {
                this.widgets[widget.uid] = widget;
            }.bind(this));
            
            console.log('widgets', playerWidgets, this.widgets);
            
            // Asign widgets to players
            var i = 0;
            _.each(this.players, function (player) {
                player.setWidgets(playerWidgets[i]);
                i++;
            }.bind(this));
        },
        
        createTasks: function (count) {
            // Get count-many random tasks from our Widgets pool
            while (count--) {
                var keys = _.keys(this.widgets),
                    key = keys[Math.floor(Math.random() * keys.length)];
                
                this.laterTasks.push(this.widgets[key].getTask());
            }
            
            console.log('created tasks', this.laterTasks);
        },
        
        assignTasks: function () {
            // Assign tasks to players who do not have a task
            _.each(this.players, function (player) {
                this.assignTask(player);
            }.bind(this));
        },
        
        assignTask: function (player) {
            var task;

            if (this.laterTasks.length && !player.hasTask()) {
                task = this.laterTasks.pop();
                task.puid = player.uid;
                player.setTask(task);
                this.nowTasks.push(task);
                
                console.log('patient needs: ', task);
                
            } else if (this.laterTasks.length == 0) {
                player.setTask({empty: true});
            }
        },
        
        widgetChanged: function (data) {
            console.log('widgetChanged', data);
            
            _.each(this.nowTasks, function (task, index) {
                // Is task resolved?
                if (task.type == data.type && task.name == data.name && task.requiredValue == data.value) {
                    // Remove this task because it is done
                    var completedTask = this.nowTasks.splice(index, 1)[0];
                    
                    console.log('task completed!', completedTask);
                    
                    // This reads a bit weird... the player may not have completed the task, but the task they are yelling for everbody to do is now completed, so we can give them new orders to bark
                    this.players[completedTask.puid].clearTask();
                    this.assignTask(this.players[completedTask.puid]);
                    
                    // Have the players won? (Are all tasks completed?)
                    if (this.laterTasks.length + this.nowTasks.length == 0) {
                        this.win();
                    }
                }
            }.bind(this));
        },
        
        win: function () {
            console.log('players have won!!');
            
            this.lobby.emit('win');
            
            this.destroy();
        },
        
        lose: function () {
            console.log('FAIL!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            
            this.lobby.emit('lose');
            
            this.destroy();
        },
        
        // Call when you are going to destroy a game
        destroy: function () {
            clearTimeout(this.gameTimer);
        }
    });

module.exports = Game;