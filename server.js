var express = require('express'),
    config = require('./config/config-app'),
    app = express.createServer();

app.use(express.static(config.public));

app.listen(3000);
