const express = require('express');
const app = express();
const port = 8080;


// app.use/routes/etc...
//

var server    = app.listen(port, () => console.log('Example app listening on port 8080!'));

var io        = require('socket.io').listen(server);

// io.sockets.on('connection', function (socket) {
//   ...
//   });


app.get('/', (req, res) => res.send('Hello World!'));

