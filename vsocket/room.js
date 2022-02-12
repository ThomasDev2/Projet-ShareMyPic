$(function(){
    var socket=io();
    image=new Image();
    var image;
    socket.on('test',()=>{
        console.log('user connected');
    });

    socket.on('load_images',()=>{
        console.log('on me dit de reload je demande les images');
        var img=new Image()
        img.src="images"
        document.body.appendChild(img);

        
        //console.log('reponse recu');
        
    });

    $('#img_form').submit(function(e){ //what happens when you submit the form
        e.preventDefault(); 
        socket.emit('img_posted');
        console.log('click sur le bouton');
    });
    
    
});