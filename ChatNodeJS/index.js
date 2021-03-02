const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('mensaje', (msg) => {
      io.emit('mensajeDesdeServidor', msg);
    });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets
