import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ImageModel } from '../model/image-model';
const roomUrl="http://localhost:3000/rooms";
const ImgUrl="http://localhost:3000/images";

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor(private http:HttpClient, private router:Router) { }

  postRoomForm(formContent:{pdeudo:string,RoomId:string,RoomPin:string}){
    console.log('controller : envoie du form : '+JSON.stringify(formContent))
    this.http.post<any>(roomUrl,formContent)
    .subscribe((response)=>{  
      console.log('reponse du server : '+ JSON.stringify(response))
      this.router.navigateByUrl('/rooms/'+response.roomId);
    })
  }

  getImages(roomId:string){
    var params=new HttpParams().set('roomId',roomId)
    return this.http.get<ImageModel[]>(ImgUrl,{params:params})
  }

}
