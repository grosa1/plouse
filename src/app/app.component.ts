import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {DomoticaPage} from "../pages/domotica/domotica";
import {RubricaPage} from "../pages/rubrica/rubrica";
import {SegnalazioniPage} from "../pages/segnalazioni/segnalazioni";
import {SpesePage} from "../pages/spese/spese";
import {ConsumiPage} from "../pages/consumi/consumi";
import {AvvisiPage} from "../pages/avvisi/avvisi";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Avvisi', component: AvvisiPage },
      { title: 'Rubrica', component: RubricaPage },
      { title: 'Segnalazioni', component: SegnalazioniPage },
      { title: 'Spese', component: SpesePage },
      { title: 'Consumi', component: ConsumiPage },
      { title: 'Domotica', component: DomoticaPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
