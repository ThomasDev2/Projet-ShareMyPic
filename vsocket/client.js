$(function(){
    var socket=io();
    
    socket.on('test',()=>{
        console.log('user connected');
    });
});