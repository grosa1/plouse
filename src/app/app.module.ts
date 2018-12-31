import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import{ BluetoothSerial } from '@ionic-native/bluetooth-serial'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConsumiPage } from '../pages/consumi/consumi'
import { RubricaPage } from '../pages/rubrica/rubrica'
import { SegnalazioniPage } from '../pages/segnalazioni/segnalazioni'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConsumiPage,
    RubricaPage,
    SegnalazioniPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConsumiPage,
    RubricaPage,
    SegnalazioniPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
