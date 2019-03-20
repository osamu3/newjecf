'use strict';
const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const favicon = require('serve-favicon');

// app.use/routes/etc...
const routes = require('./routes/index');/

/ view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const server = app.listen(port, () => console.log('Example app listening on port 8080!'));

var io     = require('socket.io').listen(server);

// io.sockets.on('connection', function (socket) {
//   ...
//   });


app.get('/', (req, res) => res.send('Hello World!'));

