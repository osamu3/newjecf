'use strict';
const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const favicon = require('serve-favicon');

// app.use/routes/etc...
const routes = require('./routes/index');

const server = app.listen(port, () => console.log('Example app listening on port 8080!'));
const io     = require('socket.io').listen(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// io.sockets.on('connection', function (socket) {
//   ...
//   });
app.use('/', routes);//ルートへのアクセスで、↑で定義したroutesを呼び出す。
//routesは、./routes/index.jsを呼び出す。
//routesは、./routes/index.js内で、「route」が定義されている。
//app.get('/', (req, res) => res.send('Hello World!'));

