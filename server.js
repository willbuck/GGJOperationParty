var express = require('express'),
    config = require('./config/config-app'),
    app = express.createServer(),
    _ = require('underscore'),
    io = require('socket.io').listen(app),
    Lobby = require('./app/Lobby.js'),
    lobbies = {'test': new Lobby({'name': 'test', 'io': io})},
    NODE_ENV = process.env.NODE_ENV || 'dev';

// app.use(express.cookieParser());
// app.use(express.session({ secret: 'awesome sauce' }));
// app.use(app.router);
app.use(express.static(config.public));

// Accept env var port number, for cloud deployment
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

// Socket.io code uncoupled from HTTP server!!
if(NODE_ENV === 'production') {
    io.configure(function () {
        io.set("transports", ["xhr-polling"]);
        io.set("polling duration", 10);
    });
}
io.sockets.on('connection', function (socket) {
    //socket.emit('data', {hello: 'world'});
    
    console.log('a client is connected');
    
    // 1. Somebody connected, send them a list of lobbies/rooms/groups whatever they can join
    socket.emit('lobbies', {lobbies: _.keys(lobbies)});
    
    // 2. They will tell us which one they want to join... I suppose in the future they might create a new one
    socket.on(
        'join',
        function (data, clientCallback) {
            if (lobbies[data.lobby]) {
                if (lobbies[data.lobby].addPlayer(socket, data)) {
                    console.log('player joined lobby: ' + data.lobby);
                }
            }
        }
    );
});