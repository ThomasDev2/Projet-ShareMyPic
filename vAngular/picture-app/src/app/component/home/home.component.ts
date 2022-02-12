import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormControlName } from '@angular/forms';
import { ControllerService } from 'src/app/service/controller.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  logInForm=new FormGroup({
    pseudo:new FormControl(''),
    roomId:new FormControl(''),
    roomPin:new FormControl('')
  })
  constructor(private controllerService:ControllerService) { }

  ngOnInit(): void {
  }
  onSubmitLogInForm():void{
    console.log('envoie du form');
    this.controllerService.postRoomForm(this.logInForm.value);
  }
}
