import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMacchinesComponent } from './list-macchines.component';

const routes: Routes = [
  {
    path: '',
    component: ListMacchinesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ListMacchinesRoutingModule {}
