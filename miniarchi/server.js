//connexion à la db
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

//server express
const express=require('express');
const app=express();
//const http=require('http').createServer(app);
//app.use(express.static(__dirname));
const port=3000;

//générateur de template
const swig=require('swig')

app.get('/',(req,res)=>{
    console.log('user connected');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(swig.renderFile('client.html'));
    res.end();
});

app.get('/client.js',(req,res)=>{
    console.log('chargement script client');
    res.sendFile('client.js');
})

app.get('/button',(req,res)=>{
    console.log('ajout dans la DB');
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("shareMyPic");
        var myobj = { name: "test", address: "avec server" };
        dbo.collection("Images").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
    
})

//envoie d'un item en DB
/*
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("shareMyPic");
    var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("Images").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
*/

console.log('app running on port :' +port);
app.listen(port);