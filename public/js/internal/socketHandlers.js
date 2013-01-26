console.log('Loading Socket.io connection');

//var socketEndpointUrl = environment.dev ? 'http://localhost' : 'http://ggj-2013-operation-party.herokuapp.com/';
var socketEndpointUrl = 'http://localhost';
var joined = false,
    socket = io.connect(window.location.hostname);

// Get named lobbies
socket.on('lobbies', function (data) {
    if (joined) {
        return;
    }

    // Join a named lobby
    socket.emit('join', {lobby: 'test'});

    // You joined your lobby successfully
    socket.on('joined', function () {
        if (joined) {
            return;
        }

        console.log('joined');

        joined = true;

        // When you are ready, tell the lobby (when everybody in the lobby is ready the game starts)
        socket.emit('ready');
    });

    // Hey the game started!
    socket.on('play', function () {
        console.log('play!');
    });

    socket.on('task', function (data) {
        console.log('Task came with data: ' + data);
    });

    socket.on('loadWidgets', function(data) {
        console.log('Loading and inserting templates: ' + data);
        _.each(data.widgets, function(widget) {
            console.log('Inserting ' + widget.name + ' at ' + widget.destination + ' with controlName ' + widget.data.controlName);
            loadWidget(widget.name, widget.destination, widget.data);
        });
    });

    socket.on('disconnect', function () {
        socket.disconnect();
    });
});