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


// Step 1 : how it works to serve html page
app.get('/', (req, res) => {
  res.render('client.html');
});

app.get('/style.css',(req,res)=>{
  res.sendFile('style.css');
});


// Step 2 : let us add the websocket part

// Initialize a new instance of socket.io by passing the http (the HTTP server) object.
var io = require('socket.io')(http);

// Listen on the connection event for incoming sockets and log it to the console.
io.on('connection', (socket) => {
  console.log('a user connected ');
  socket.emit('test');
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log('server listening on : '+PORT);
});