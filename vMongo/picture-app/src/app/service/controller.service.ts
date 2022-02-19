import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const roomUrl="http://localhost:3000/rooms"

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor(private http:HttpClient) { }

  postRoomForm(formContent:{pdeudo:string,RoomId:string,RoomPin:string}){
    console.log('controller : envoie du form : '+JSON.stringify(formContent))
    this.http.post<any>(roomUrl,formContent)
    .subscribe((response)=>{
      console.log(response);
    })
  }

}
