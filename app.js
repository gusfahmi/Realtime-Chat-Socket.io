const express = require('express');
const socket = require('socket.io');
const app = express(); 

app.use(express.static('public'));
 
const server = app.listen('2000'); 
const io = socket(server);

io.on('connection', (socket)=>{ 

    socket.on('chat', (data)=>{ 
      io.emit('chat', data);
    }); 

    socket.on('typing', (data)=>{ 
      socket.broadcast.emit('typing', data);
    }); 

})