import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
const roomUrl="http://localhost:3000/rooms";

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

}
