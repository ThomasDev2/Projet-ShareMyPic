const express = require('express')
const parser =require('body-parser')
const app = express()
const port = 3000

app.use(parser.urlencoded({
    extended: true
 }));
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/client.html')
});
app.get('/1', (req, res) => {
    res.send('de la page 1')
  });
  app.get('/2', (req, res) => {
    res.send('de la page 1')
  });

app.post('/test',(req,res)=>{
    var fname = req.body.fname;
   var response = 'Hello:' + fname;
   res.send(response);
   console.log(response);
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})