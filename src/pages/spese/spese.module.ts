import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpesePage } from './spese';

@NgModule({
  declarations: [
    SpesePage,
  ],
  imports: [
    IonicPageModule.forChild(SpesePage),
  ],
})
export class CostiPageModule {}
