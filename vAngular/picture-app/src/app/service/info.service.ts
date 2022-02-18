import { Injectable } from '@angular/core';
import { InfoModel } from '../model/info-model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InfoService {
  infosSource=new BehaviorSubject({pseudo:"",roomId:""})
  observableInfos=this.infosSource.asObservable();
  constructor(){}

  setInfos(newInfos:InfoModel):void{
    this.infosSource.next(newInfos);
  }
}
