import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LigaRoutingModule } from './liga-routing.module';
import { LigaListComponent } from './liga-list/liga-list.component';


@NgModule({
  declarations: [
    LigaListComponent
  ],
  imports: [
    CommonModule,
    LigaRoutingModule
  ]
})
export class LigaModule { }
