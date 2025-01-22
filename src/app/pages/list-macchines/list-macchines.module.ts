import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { ListMacchinesComponent } from './list-macchines.component';
import { ListMacchinesRoutingModule } from './list-macchines-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ListMacchinesRoutingModule],
  declarations: [ListMacchinesComponent]
})
export class ListMacchinesModule {}
