console.log("script client chargé");
$(document).ready(function(){
    $("#send").click(function(){
        console.log('requete denvoie coté client');
        var xhr = new XMLHttpRequest();
        xhr.open("GET","http://localhost:3000/button",true);
        xhr.send(null);
    });
});
