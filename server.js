var express = require('express'),
    config = require('./config/config-app'),
    app = express.createServer(),
    _ = require('underscore'),
    io = require('socket.io').listen(app),
    Lobby = require('./app/Lobby.js'),
    lobbies = {'test': new Lobby({'io': io})};

app.use(express.static(config.public));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

// Socket.io code uncoupled from HTTP server!!
io.sockets.on('connection', function (socket) {
    //socket.emit('data', {hello: 'world'});
    
    // 1. Somebody connected, send them a list of lobbies/rooms/groups whatever they can join
    socket.emit('lobbies', {lobbies: _.keys(lobbies)});
    
    // 2. They will tell us which one they want to join... I suppose in the future they might create a new one
    socket.on(
        'join',
        function (data, clientCallback) {
            console.log('player joined lobby: ' + data.lobby);
            
            if (lobbies[data.lobby]) {
                lobbies[data.lobby].addPlayer(socket, data);
            }
        }
    );
});