const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);


const { Server } = require("socket.io");
const io = new Server(server,{cors: {
  origin: "http://localhost:4200",
  methods: ["GET", "POST"]
}});

const env = require('dotenv');
env.config();

const cors=require('cors');

//module file sync uilisé pour manipuler des fichiers
const fs=require('fs');

//module mongoose nous permetand d'intéragier avec mongo db
const mongoose = require('mongoose');


//module permetant d'écrire des fichier
const multer = require('multer');

//fonction qui a stock un fichier
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'storage')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

// quelque chose de brillant
const upload = multer({ storage: storage });
const imgModel = require('./models/imgmodel');

//connexion à la db
mongoose
  .connect(process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }, err => {
      console.log('connected')
  });

//controller des acces a la db d'images

//faut remplacer l'adresse du get par ce qu'on veut
app.use(cors());
app.get('/images', (req, res) => {
  var roomId=req.query.roomId;
  console.log('images demandés pour la room : '+ roomId)
  imgModel.find({roomId:roomId}, (err, items) => {
      if (err) {
          console.log(err);
          res.status(500).send('An error occurred', err);
      }
      else {
        res.send(items)
      }
  });
});

//faut remplacer l'adresse du post par ce qu'on veut
app.use(cors());
app.post('/images', upload.single('image'), (req, res, next) => {
  
  var obj = {
      roomId: req.body.roomId,
      title: req.body.title,
      desc: req.body.desc,
      content:{
        data: fs.readFileSync(__dirname + '/storage/' + req.file.filename),
        contentType: 'image/png'
      },
      author: req.body.author
  }
  imgModel.create(obj, (err, item) => {
      if (err) {
          console.log(err);
          
      }
      else {
          // faut mettre l'endroit où on veut être redirect, ou juste changer le retour de la fonction d'ailleurs
          res.redirect('/testClients');
          item.save();
      }
  });
});



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