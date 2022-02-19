import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket:any
  socketUrl='http://localhost:3000'
  constructor() {
    this.socket=io(this.socketUrl);
  }
  on(event:string){
    return new Observable((subscriber)=>{
      this.socket.on(event,(data:any)=>{
        subscriber.next(data);
        console.log('data reçu du socket : '+ (data))
      });
    });
  };
  emit(event:string,data:any){
    console.log('data envoyé du socket : '+(data))
    this.socket.emit(event,(data));
  }
}
