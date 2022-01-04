console.log("script client chargé");
$(document).ready(function(){
    $("#send").click(function(){
        var name=$("#nameField").val();
        var address=$("#addressField").val();
        const params = {
            name: name,
            address: address
        }
        const content=JSON.stringify(params);
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST","http://localhost:3000/button",true);
        xhr.setRequestHeader('Content-type', 'application/json');
        console.log('envoie de : '+content);
        xhr.send(content); 
    });

    $("#sendImg").click(()=>{
        const img="";
        const content={
            data:'to be implemented'
        };
        var xhr = new XMLHttpRequest();
        xhr.open("POST","http://localhost:3000/sendImg",true);
        xhr.setRequestHeader('Content-type', 'application/json');
        console.log('envoie de : '+content);
        xhr.send(content); 
    });
});
