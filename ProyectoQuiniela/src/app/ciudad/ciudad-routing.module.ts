import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CiudadDetailsComponent } from './ciudad-details/ciudad-details.component';
import { CiudadListComponent } from './ciudad-list/ciudad-list.component';
const routes: Routes = [
  { path:'list', component: CiudadListComponent},
  {  path: 'details/:id', component: CiudadDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CiudadRoutingModule { }
