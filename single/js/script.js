var socket = io('ws://localhost:3000');
var local = new Local(socket);

var remote = new Remote(socket);

// local.start();
// remote.start(2, 2);
// remote.bindEvents();

socket.on('waiting',function(str){
  document.getElementById('waiting').innerHTML = str;
});
