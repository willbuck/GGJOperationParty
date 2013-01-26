var express = require('express'),
    config = require('./config/config-app'),
    app = express.createServer(),
    io = require('socket.io').listen(app);

app.use(express.static(config.public));

app.listen(3000);

// Socket.io code uncoupled from HTTP server!!
io.sockets.on('connection', function (socket) {
    socket.emit('data', {hello: 'world'});
});