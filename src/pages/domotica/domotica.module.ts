import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DomoticaPage } from './domotica';

@NgModule({
  declarations: [
    DomoticaPage,
  ],
  imports: [
    IonicPageModule.forChild(DomoticaPage),
  ],
})
export class ConsumiPageModule {}
