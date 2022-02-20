import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/service/socket.service';
import { Subscription } from 'rxjs';
import { InfoService } from 'src/app/service/info.service';
import { InfoModel } from 'src/app/model/info-model';
import { ImagesService } from 'src/app/service/images.service';
import { ImageModel } from 'src/app/model/image-model';
import { Buffer } from 'buffer';
import { FormGroup,FormControl } from '@angular/forms';
import { ControllerService } from 'src/app/service/controller.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
//Cette classe sert à gérer les différents fonctions de la page principale room
export class RoomComponent implements OnInit {

  // --- CHAMPS ---
  //informations mis à jour depuis une souscription à un observable
  infos:InfoModel={pseudo:"",roomId:"-1"};

  //images récupérés grâce au controller qui effectue les appels http
  images:ImageModel[]=[{_id:"",title:"",content:{data:Buffer.alloc(0),contentType:''},desc:'',author:''}]

  //listes des url des images à montrer dans la page
  printedImages=[''];

  //souscrition pour pouvoir récupérer les information des observable
  infoSubscription=new Subscription;
  imagesSubscription=new Subscription;

  //Form contenant les différents champs à remplire pour poster/update une nouvelle image
  imageForm=new FormGroup({
    title:new FormControl(''),
    desc:new FormControl(''),
    roomId:new FormControl(''),
    author:new FormControl('')

  })
  //file téléversé dans le champ file
  fileToUpload: File | null = null;

  //id de l'image selctionner pour délétion/update
  selectedId=""

  // --- CONSTRUCTEUR ET ONINIT ---
  constructor(private socketService:SocketService,
    private infoService:InfoService,
    private controllerService:ControllerService) {}
    

  ngOnInit(): void {

    //on récupère les informations données dans le composant login grâce à une souscriptions à un observable
    this.infoSubscription=this.infoService.observableInfos
      .subscribe((newInfos)=>{
        this.infos=newInfos
      });

    
    
    //ici on écoutes les messages du socket pour savoir quand redemander les images ou passer à la slide suivante
    this.socketService.on('serverTestEvent').subscribe(()=>console.log('room : message de test receptionné'));
    this.socketService.on('updateImages').subscribe(()=>{
      this.onBtnUpdate()
    })
  }
  
  // --- FONCTIONS ---
  //cette fonction appelle le controller pour faire un appel get au server pour récupérer les images
  updateImages(){
    console.log('appel de update images');
    this.controllerService.getImages(this.infos.roomId).subscribe((fetchedImages)=>{
      this.images=fetchedImages;
    })
  }

  //cette fonction met a jour la listes des url des images à partir des images récupérées depuis le server
  printImages(){
    console.log('appel de print images')
    this.printedImages=[];
    var buffer:Buffer;
    var bufferString:String;
    if(this.images!=[]){
      for(let img of this.images){
        buffer=new Buffer(img.content.data);
        bufferString=buffer.toString('base64');
        this.printedImages.push('data:image/png;base64,'+bufferString)
      }
    }
  }

  //cette fonction poste au server via l'intermédiaire du controller service le form et le fichier associé à une nouvelle image  
  onSubmitImage(){
    if(this.fileToUpload !== null){
      this.controllerService.postImages(this.fileToUpload,this.imageForm.value)
      this.socketService.emit('newImage',this.infos.roomId);
    }
    else{
      alert('impossible denvoyer une image null');
    }
  }

  //cette fonction ecoute les changement de fichier téléverser avant lenvoie
  onFileSelect(e:Event) {
    var data:FileList |null
    data=(<HTMLInputElement>e.target).files
    if (data !== null){
      this.fileToUpload=data.item(0);
    }
  }

  //cette fonction sert au débugging du socket elle a été laissé à titre d'exemple
  onSendTest(){
    this.socketService.emit('testEvent','test')
  }

  //ce bouton sert à mettre à jour les images si car les appels des fonctions par les évennements du socket n'ont pas l'air de marcher 
  onBtnUpdate(){
    (console.log('appuie sur le bouton de maj'))
    this.updateImages(); 
    this.printImages();
    
  }

  //cette fonction
  onUpdateImage(){
      this.controllerService.updateImage(this.selectedId,this.imageForm.value)
      this.socketService.emit('newImage',this.imageForm.value.roomId);
    
    
  }

  onDeleteImage(){
    this.controllerService.deleteImage(this.selectedId);
    this.socketService.emit('newImage',this.imageForm.value.roomId);
  }
  
}
