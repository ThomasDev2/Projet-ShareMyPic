import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/service/socket.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private socketService:SocketService) { }

  ngOnInit(): void {
  }
  onSendMessage(){
    console.log('component : envoie dun test');
    this.socketService.emit('testEvent','test')
  }
}
