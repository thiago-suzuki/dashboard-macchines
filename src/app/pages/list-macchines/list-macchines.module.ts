import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { ListMacchinesComponent } from './list-macchines.component';
import { ListMacchinesRoutingModule } from './list-macchines-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsMacchineComponent } from 'src/app/components/details-macchine/details-macchine.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@NgModule({
  declarations: [ListMacchinesComponent, DetailsMacchineComponent, MenuComponent],
  imports: [CommonModule, FormsModule, IonicModule, ListMacchinesRoutingModule, ReactiveFormsModule],
  providers: [MenuComponent],
  exports: [MenuComponent]
})
export class ListMacchinesModule {}
