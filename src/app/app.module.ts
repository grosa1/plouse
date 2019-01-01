import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import{ BluetoothSerial } from '@ionic-native/bluetooth-serial'
import { ChartsModule } from 'ng2-charts';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConsumiPage } from '../pages/consumi/consumi'
import { RubricaPage } from '../pages/rubrica/rubrica'
import { SegnalazioniPage } from '../pages/segnalazioni/segnalazioni'
import {CostiPage} from "../pages/costi/costi";
import {StatistichePage} from "../pages/statistiche/statistiche";
import {AvvisiPage} from "../pages/avvisi/avvisi";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConsumiPage,
    RubricaPage,
    SegnalazioniPage,
    CostiPage,
    StatistichePage,
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
    ConsumiPage,
    RubricaPage,
    SegnalazioniPage,
    CostiPage,
    StatistichePage,
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
