const express = require('express'); 
const app = express();
const http = require('http').createServer(app);
const cors =require('cors');
const env = require('dotenv');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var fs = require('fs'); // à rajouter
var path = require('path');
require('dotenv/config');
app.use(bodyParser.urlencoded({ extended: false })) //ok express.json()
app.use(bodyParser.json())

env.config();

mongoose
  .connect(process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }, err => {
      console.log('connected')
  });

var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });
var imgModel = require('./models/imgmodel');

//faut remplacer l'adresse du get par ce qu'on veut
app.get('/', (req, res) => {
  imgModel.find({}, (err, items) => {
      if (err) {
          console.log(err);
          res.status(500).send('An error occurred', err);
      }
      else {
        //Besoin d'aide pour savoir sous quel forme tu veux le renvoi
          res.render('imagesPage', { items: items });
      }
  });
});

//faut remplacer l'adresse du post par ce qu'on veut
app.post('/', upload.single('image'), (req, res, next) => {
  
  var obj = {
      name: req.body.name,
      desc: req.body.desc,
      path: {
          data: fs.readFileSync(path.join(__dirname + '/storage/' + req.file.filename)),
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
          res.redirect('/');
      }
  });
});


app.use(express.json());
app.use(cors());

app.post("/rooms",(req,res)=>{
  console.log('post on /rooms')
  console.log(JSON.stringify(req.body));
  res.status(200);
  res.send({response:req.body})
});


const PORT = 3000;
http.listen(PORT, () => {
  console.log('server listening on : '+PORT);
});

