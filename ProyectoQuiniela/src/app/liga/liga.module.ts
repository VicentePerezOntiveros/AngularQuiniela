import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LigaRoutingModule } from './liga-routing.module';
import { LigaListComponent } from './liga-list/liga-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LigaListComponent
  ],
  imports: [
    CommonModule,
    LigaRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class LigaModule { }
