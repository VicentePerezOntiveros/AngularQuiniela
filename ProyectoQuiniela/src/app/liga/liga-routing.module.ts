import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LigaListComponent } from './liga-list/liga-list.component';

const routes: Routes = [
  { path:'list', component: LigaListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LigaRoutingModule { }
