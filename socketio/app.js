var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

var clientCount = 0;

var PORT = 3000;

app.listen(PORT);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  clientCount++;
  socket.nickname = 'user' + clientCount;
  io.emit('enter',socket.nickname + 'comes in');

  socket.on('message',function(str){
    io.emit('message',socket.nickname +' says: ' + str);
  });

  socket.on('disconnect',function(){
    io.emit('leave',socket.nickname + 'leave');
  });

});
console.log("websocket server listening on port "+PORT);
