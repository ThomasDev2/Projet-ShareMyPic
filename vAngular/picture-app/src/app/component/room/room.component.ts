import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/service/socket.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { InfoService } from 'src/app/service/info.service';
import { InfoModel } from 'src/app/model/info-model';
import { ImagesService } from 'src/app/service/images.service';
import { ImageModel } from 'src/app/model/image-model';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent implements OnInit {
  infos:InfoModel={pseudo:"",roomId:"-5"};
  images:ImageModel[]=[{id:-1,title:"",content:{data:new Buffer(''),contentType:''},desc:'',author:''}]
  printedImages=[''];
  infoSubscription=new Subscription;
  imagesSubscription=new Subscription;
  constructor(private socketService:SocketService,private infoService:InfoService, private imagesService:ImagesService) {
    
    this.infoSubscription=this.infoService.observableInfos
      .subscribe((newInfos)=>{
        this.infos=newInfos
      });
    this.imagesSubscription=this.imagesService.observableImages
    .subscribe((newImages)=>{
      this.images=newImages
    })
    
    //écouter des events > this.socketService.on('event').subscribe((args)=>{actions});
    this.socketService.on('serverTestEvent').subscribe();

    this.updateImages();
    this.printImages();
  }

  ngOnInit(): void {
    
  }

  //exemple d'emit
  onSendTest(){
    this.socketService.emit('testEvent','test')
  }
  onBtnUpdate(){
    this.updateImages(); 
    this.printImages();
  }
  updateImages(){
    this.imagesService.setImages(this.infos.roomId);
  }
  printImages(){
    
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
    console.log(this.printedImages)
  }
}
