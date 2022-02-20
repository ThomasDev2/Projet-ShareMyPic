import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { Router } from '@angular/router';
import { ImageModel } from '../model/image-model';
const roomUrl="http://localhost:3000/rooms";
const ImgUrl="http://localhost:3000/images";

@Injectable({
  providedIn: 'root'
})
//Ce service sert à gérer les différentes requetes http vers le server
export class ControllerService {

  constructor(private http:HttpClient, private router:Router) { }

  //post d'une room (sert à vérifier que la room existe et que le pin est bon, 
  //non implémenté car manque de temps et pas dans les stories principales)
  postRoomForm(formContent:{pdeudo:string,RoomId:string,RoomPin:string}){
    console.log('controller : envoie du form : '+JSON.stringify(formContent))
    this.http.post<any>(roomUrl,formContent)
    .subscribe((response)=>{  
      console.log('reponse du server : '+ JSON.stringify(response))
      this.router.navigateByUrl('/rooms/'+response.roomId);
    })
  }
  //récupère les images pour la room dans laquelle on se trouve
  getImages(roomId:string){
    var params=new HttpParams().set('roomId',roomId)
    return this.http.get<ImageModel[]>(ImgUrl,{params:params})
  }
  //post une nouvelle image
  postImages(file:File,body:any){
    const formData: FormData = new FormData();
    formData.append('roomId',body.roomId);
    formData.append('title',body.title);
    formData.append('file',file,file.name);
    formData.append('desc',body.desc);
    formData.append('author',body.author);

    this.http.post<any>(ImgUrl,formData)
    .subscribe((response)=>{ 
    })
  }
  //met a jour l'image selectionnée
  updateImage(id:string,body:any){
    console.log('jupdate avec ' + JSON.stringify(body))
    var params=new HttpParams().set('_id',id)
    this.http.patch<any>(ImgUrl,body,{params:params})
    .subscribe((response)=>{

    })
  }
  //supprime l'image selectionnée
  deleteImage(id:string){
    var params=new HttpParams().set('_id',id)
    this.http.delete<any>(ImgUrl,{params:params})
    .subscribe((response)=>{
    })
  }
}
