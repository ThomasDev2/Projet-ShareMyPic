const express = require('express'); 
const app = express();
const http = require('http').createServer(app);
const cors =require('cors');

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