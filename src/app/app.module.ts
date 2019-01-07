import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import{ BluetoothSerial } from '@ionic-native/bluetooth-serial'
import { ChartsModule } from 'ng2-charts';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DomoticaPage } from '../pages/domotica/domotica'
import { RubricaPage } from '../pages/rubrica/rubrica'
import { SegnalazioniPage } from '../pages/segnalazioni/segnalazioni'
import {SpesePage} from "../pages/spese/spese";
import {ConsumiPage} from "../pages/consumi/consumi";
import {AvvisiPage} from "../pages/avvisi/avvisi";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DomoticaPage,
    RubricaPage,
    SegnalazioniPage,
    SpesePage,
    ConsumiPage,
    AvvisiPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DomoticaPage,
    RubricaPage,
    SegnalazioniPage,
    SpesePage,
    ConsumiPage,
    AvvisiPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
