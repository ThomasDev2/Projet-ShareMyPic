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
  listen(event:string){
    return new Observable((subscriber)=>{
      this.socket.on(event,(data:any)=>{
        subscriber.next(data);
      });
    });
  };
  emit(event:string,data:any){
    console.log('client socket : envoie de :'+data)
    this.socket.emit(event,data);
  }
}
