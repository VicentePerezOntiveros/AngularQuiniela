import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiudadRoutingModule } from './ciudad-routing.module';
import { CiudadListComponent } from './ciudad-list/ciudad-list.component';
import { CiudadDetailsComponent } from './ciudad-details/ciudad-details.component';


@NgModule({
  declarations: [
    CiudadListComponent,
    CiudadDetailsComponent
  ],
  imports: [
    CommonModule,
    CiudadRoutingModule
  ]
})
export class CiudadModule { }
