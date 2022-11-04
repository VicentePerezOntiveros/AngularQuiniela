import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CiudadCreateComponent } from './ciudad-create/ciudad-create.component';
import { CiudadDetailsComponent } from './ciudad-details/ciudad-details.component';
import { CiudadListComponent } from './ciudad-list/ciudad-list.component';
const routes: Routes = [
  { path:'list', component: CiudadListComponent},
  {  path: 'details/:id', component: CiudadDetailsComponent},
  { path: 'create', component: CiudadCreateComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CiudadRoutingModule { }
