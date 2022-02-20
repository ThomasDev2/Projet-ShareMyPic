import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { RoomComponent } from './component/room/room.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"rooms",children:[{
    path:":id",component:RoomComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
