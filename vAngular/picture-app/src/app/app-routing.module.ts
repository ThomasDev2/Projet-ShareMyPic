import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaporamaComponent } from './component/diaporama/diaporama.component';
import { HomeComponent } from './component/home/home.component';
import { PictureFormComponent } from './component/picture-form/picture-form.component';
import { RoomComponent } from './component/room/room.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"room",component:RoomComponent},
  {path:"picture-form",component:PictureFormComponent},
  {path:"diaporama",component:DiaporamaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
