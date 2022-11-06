import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiudadRoutingModule } from './ciudad-routing.module';
import { CiudadListComponent } from './ciudad-list/ciudad-list.component';
import { CiudadDetailsComponent } from './ciudad-details/ciudad-details.component';
import { CiudadCreateComponent } from './ciudad-create/ciudad-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../shared/shared.module';
import { CiudadUpdateComponent } from './ciudad-update/ciudad-update.component';


@NgModule({
  declarations: [
    CiudadListComponent,
    CiudadDetailsComponent,
    CiudadCreateComponent,
    CiudadUpdateComponent
  ],
  imports: [
    CommonModule,
    CiudadRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    SharedModule
  ]
})
export class CiudadModule { }
