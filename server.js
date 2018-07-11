//dependencies
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//static routes
app.use(express.static('public'));
app.use(express.static('semantic'));

//get index
app.get('/', (req, res, next) => {
  res.sendfile(__dirname + '/public/index.html')
});

//socket connection
io.on('connection', client => {
  console.log('new user connected');

  client.on('join', data => {
    console.log(data);
  })

  client.on('messages', data => {
    client.emit('thread', data)
    client.broadcast.emit('thread', data)
  })
  
})



//server listen
server.listen(PORT, () => {
  console.log("app listening on port:", PORT);
})
