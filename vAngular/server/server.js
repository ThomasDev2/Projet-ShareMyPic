//creation du server express
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);


const { Server } = require("socket.io");

//creation du socket pour les demandes synchrones
const io = new Server(server,{cors: {
  origin: "http://localhost:4200",
  methods: ["GET", "POST"]
}});

//module permettant de récupérer la configuration d'autres modules
const env = require('dotenv');
env.config();

const cors=require('cors');

//module file sync uilisé pour manipuler des fichiers
const fs=require('fs');

//module mongoose nous permetant d'intéragir avec mongo db
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

//module multer permet de gérer les téléchargements des images dans la db
const upload = multer({ storage: storage });
const imgModel = require('./models/imgmodel');
const imgSchema = require('./models/imgmodel');

//connexion à la db grace au module mongoose
mongoose
  .connect(process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }, err => {
      console.log('connected')
  });

//controller des acces a la db d'images

//reception d'une requete get le on cherche les images de la room passé en parametre de requete
app.use(cors());
app.get('/images', (req, res) => {
  var roomId=req.query.roomId;
  var desc=req.query.desc;
  console.log('desc : ' + desc)
  console.log('images demandés pour la room : '+ roomId)
  if(desc == undefined){

  
  imgModel.find({roomId:roomId}, (err, items) => {
    if (err) {
        console.log(err);
        res.status(500).send('An error occurred', err);
    }
    else {
      res.send(items)
    }
  });
  }
  else{
    imgModel.find({roomId:roomId,desc:desc}, (err, items) => {
      console.log('je rentre dans le filtre')
      if (err) {
          console.log(err);
          res.status(500).send('An error occurred', err);
      }
      else {
        res.send(items)
      }
    });
  }

});



//recepetion d'un post, on crée l'image dans la db à partir du file et des champs du body
app.use(cors());
app.post('/images', upload.array('file'), (req, res, next) => {
  var n=req.files.length;
  for(i=0;i<n;i++){
    var obj = {
      roomId: req.body.roomId,
      title: req.body.title,
      desc: req.body.desc,
      content:{
        data: fs.readFileSync(__dirname + '/storage/' + req.files[i].filename),
        contentType: 'image/png'
      },
      author: req.body.author
    }
    imgSchema.create(obj, (err, item) => {
      if (err) {
        console.log(err);
          
      }
      else {      
        item.save();
      }
    });
  }
  res.send({response:'image crée'})
});

//reception d'un delete on supprime l'image correspondant à l'id passé en parametre
app.use(cors())
app.delete('/images',(req,res)=>{
  var id=req.query._id;
  console.log("deletion de l'image : "+id)
  imgModel.deleteOne({_id:id},err=>{
    if(err) console.log(err)
  });
  res.send({response:'ok'})
})

app.use(express.json());
app.patch('/images',(req,res)=>{
  
  var id=req.query._id;
  console.log("mise à jour de l'image : "+id +"avec les nouvelles infos : "+ req.body)
  
  imgModel.updateOne({_id:id},{title:req.body.title,author:req.body.author,desc:req.body.desc},(err)=>{
    if(err) console.log(err)
  });
  res.send({response:'ok'})
})

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

io.on('connection',(socket)=>{
  socket.on('newImage',(roomId)=>{
    console.log('image postée dans la room '+roomId)
    console.log('on demande aux sockets de la room de faire une Maj de leurs images')
    io.to(roomId).emit('updateImages','maj images')
  })
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