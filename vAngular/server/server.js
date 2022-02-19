const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{cors: {
  origin: "http://localhost:4200",
  methods: ["GET", "POST"]
}});

const cors=require('cors');

//connection d'un client au socket
io.on('connection', (socket)=>{
  console.log('user connected')
  //decoonexion d'un client au socket
  socket.on('disconnect',(socket)=>{
    console.log('user disconnected');
  });
});

//reception du message de test
io.on('connection', (socket) => {
  socket.on('testEvent',(data)=>{
    console.log('test recu : ' +data);
    console.log('test renvoyés aux socket');
    io.emit('serverTestEvent', data);
  });
});

//reception d'un message de join d'une room
io.on('connection',(socket)=>{
  //on ajoute le client dans la room
  socket.on('login',(data)=>{
    socket.join(data.roomId);
    //log server
    console.log(data.pseudo +' joined room : '+data.roomId)
    //notification aux autres membres de la room
    io.to(data.roomId).emit('notifNewUser', data.pseudo +' joined')
  });
  
})

app.use(cors());
app.use(express.static(__dirname))
app.use(express.json()); // nouvelle fonctionnalité d'express qui 
//lui permet d'handle les json sans avoir besoin du middleware body parser 

//page servie uniquement pour faire des test à retirer dans le rendue
app.get('/testClients', (req, res) => {
  res.sendFile(__dirname+'/testClient.html');
});

app.use(cors());
app.post('/rooms',(req,res)=>{
  console.log("demande dacces a une room posté \n form recu : "+JSON.stringify(req.body));
  res.send(req.body);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});