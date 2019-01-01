import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CostiPage } from './costi';

@NgModule({
  declarations: [
    CostiPage,
  ],
  imports: [
    IonicPageModule.forChild(CostiPage),
  ],
})
export class CostiPageModule {}
