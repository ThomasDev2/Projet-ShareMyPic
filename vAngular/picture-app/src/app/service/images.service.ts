import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ControllerService } from './controller.service';
import { Buffer } from 'buffer';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  imagesSource=new BehaviorSubject([{id:-1,title:"",content:{data:Buffer.alloc(0),contentType:''},desc:'',author:''}]);
  observableImages=this.imagesSource.asObservable();
  constructor(private controllerService:ControllerService) { }
  setImages(roomId:string):void{
    this.controllerService.getImages(roomId)
    .subscribe((data)=>{
      this.imagesSource.next(data);
    })
    
  }
}
