var express = require('express'); 
var app = express();
var http = require('http').createServer(app);

//template engine
const nunjucks = require('nunjucks');
const path = require('path');

nunjucks.configure(path.join(__dirname), {
    autoescape: true,
    express: app
});

app.set('view engine', 'html')
app.use(express.static(__dirname));


app.get('/',(req,res)=>{
  res.render('login.html');
});
// Step 1 : how it works to serve html page
app.get('/room', (req, res) => {
  res.render('room.html');
});

app.get('/style.css',(req,res)=>{
  res.sendFile('style.css');
});

app.get('/images',(req,res)=>{
  res.sendFile('/img.png');
  console.log('demande dimages recue on répond');
});

app.post('/images',(req,res)=>{
  
});

// Step 2 : let us add the websocket part

// Initialize a new instance of socket.io by passing the http (the HTTP server) object.
var io = require('socket.io')(http);

// Listen on the connection event for incoming sockets and log it to the console.
io.on('connection', (socket) => {
  console.log('a user connected ');
  io.emit('test');
});

// Chargement 
io.on('connection',(socket)=>{
  socket.on('img_posted',(socket)=>{
    console.log('image posted par un client')
    io.emit('load_images');
    console.log('tout le monde reload')
  });
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log('server listening on : '+PORT);
});