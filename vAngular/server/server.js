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

io.on('connection', (socket) => {
  socket.on('testEvent',(data)=>{
    console.log('test recu : ' +data);
  });
});

app.use(cors());
app.use(express.static(__dirname))
app.use(express.json());

app.get('/testClients', (req, res) => {
  res.sendFile(__dirname+'/testClient.html');
});

app.use(cors());
//app.use(express.json);
app.post('/rooms',(req,res)=>{
  console.log("demande dacces a une room posté \n form recu : "+JSON.stringify(req.body));
  res.send(req.body);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});