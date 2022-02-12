//connexion à la db
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

//server express
const express=require('express');
const bodyParser = require('body-parser');
const app=express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//const http=require('http').createServer(app);
app.use(express.static(__dirname));
app.use
const port=3000;



//générateur de template
const swig=require('swig');

//gestionnaire d'upload de fichier pour le crud des images
const upload=require('express-fileupload');

//pages servies
//index page
app.get('/',(req,res)=>{
    console.log('user connected');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(swig.renderFile('webrpg/index.html'));
    res.end();
});

//index script
app.get('/client.js',(req,res)=>{
    console.log('chargement script client');
    res.sendFile('client.js');
  
});

//Crud

//image CRUD
//get -> READ
app.get('/image',(req,res)=>{
  console.log('user accessed to image')
  
  

});


//post -> CREATE
app.post('/image',(req,res)=>{
  var recu=req.body;
  console.log(recu);
  
  res.redirect('/');
  //res.sendStatus(200):
});
//delete -> DELETE 
app.delete('/image',(req,res)=>{

});
//patch -> UPDATE 
app.patch('/image',(req,res)=>{

});

//room CRUD
//get -> READ
app.get('/room',(req,res)=>{

});
//post -> CREATE
app.post('/room',(req,res)=>{
});
//delete -> DELETE 
app.delete('/room',(req,res)=>{

});
//patch -> UPDATE 
app.patch('/room',(req,res)=>{

});






app.listen(port,()=>{
  console.log('app running on port :' +port);
});