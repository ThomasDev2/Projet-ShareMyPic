const express = require('express'); 
const app = express();
const http = require('http').createServer(app);
const cors =require('cors');
const env = require('dotenv');
const mongoose = require('mongoose');

env.config();

const ImagesRoutes = require('./routes/imgroute');

mongoose
  .connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database connected');
  });

app.use(express.json());
app.use(cors());
app.use('/api', ImagesRoutes);//pour poster une img du coup faut la poster sur /api/image/create mais on peut changer l'url ça change rien (faut modif dans route/img)

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




