import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/service/socket.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { InfoService } from 'src/app/service/info.service';
import { InfoModel } from 'src/app/model/info-model';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  infos:InfoModel={pseudo:"",roomId:""};
  infoSubscription=new Subscription;
  constructor(private socketService:SocketService,private infoService:InfoService) {
    
    this.infoSubscription=this.infoService.observableInfos
      .subscribe((newInfos)=>{
        this.infos=newInfos
      });
    
    //écouter des events > this.socketService.on('event').subscribe((args)=>{actions});
    this.socketService.on('serverTestEvent').subscribe();
  }

  ngOnInit(): void {
    
  }

  //exemple d'emit
  onSendTest(){
    this.socketService.emit('testEvent','test')
  }
}
