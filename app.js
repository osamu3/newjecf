// sockcet.io sample code

var socketIO = require('socket.io');
var io = socketIO.listen(8080);

// event that clietns connect
io.sockets.on('connection', function(socket) {
  console.log("connection");

  // event when recieving messages
  socket.on('message', function(data) {
    console.log("message");
    io.sockets.emit('message', data);
  });

  // event that clients disconnect
  socket.on('disconnect', function(){
    console.log("disconnect");
  });
});

