import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InfoModel } from 'src/app/model/info-model';
import { InfoService } from 'src/app/service/info.service';
import { SocketService } from 'src/app/service/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  infoSubscription=new Subscription;
  infos:InfoModel={pseudo:"",roomId:""}
  logInForm=new FormGroup({
    pseudo:new FormControl(''),
    roomId:new FormControl(''),
    roomPin:new FormControl('')
  })
  constructor(private socketService:SocketService,private infoService:InfoService, private router:Router) { 
    this.infoSubscription=this.infoService.observableInfos
      .subscribe((newInfos)=>{
        this.infos=newInfos
      });

    this.socketService.on('notifNewUser').subscribe();
  }

  ngOnInit(): void {
  }
  onSubmitLogInForm():void{
    //on récupère les infos du form et on les stock dans le infos model local
    this.infos={pseudo:this.logInForm.value.pseudo,roomId:this.logInForm.value.roomId};
    //on affecte l'infos local aux infos observables partagées par tous les components
    this.infoService.setInfos(this.infos);
    //on envoie au socket
    this.socketService.emit('login',{pseudo:this.infos.pseudo,roomId:this.infos.roomId});

    this.router.navigateByUrl('/rooms/'+this.infos.roomId);
  }
}
