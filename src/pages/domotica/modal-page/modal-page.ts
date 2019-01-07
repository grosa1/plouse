import { Component } from '@angular/core';
import {AlertController, IonicPage, NavParams, ViewController} from 'ionic-angular';
import {BluetoothSerial} from "@ionic-native/bluetooth-serial";

/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-page',
  templateUrl: 'modal-page.html',
})
export class ModalPage {

  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;
  isConnected = false;

  constructor(private navParams: NavParams,
              private view: ViewController,
              private bluetoothSerial: BluetoothSerial,
              private alertCtrl: AlertController) {
  }

  ngOnInit() {
    const data = this.navParams.get('data');
    this.isConnected = data['state'];
  }

  startScanning() {
    this.pairedDevices = null;
    this.unpairedDevices = null;
    this.gettingDevices = true;
    this.bluetoothSerial.discoverUnpaired().then((success) => {
        this.unpairedDevices = success;
        this.gettingDevices = false;
        success.forEach(element => {

        });
      },
      (err) => {
        console.log(err);
      })

    this.bluetoothSerial.list().then((success) => {
        this.pairedDevices = success;
      },
      (err) => {

      })
  }

  success = (data) => {
    this.presentAlert("Connessione effettuata!");
    this.isConnected = true;
    this.closeModal();
  };

  fail = (error) => this.presentAlert("Errore di connessione");

  selectDevice(address: any) {

    let alert = this.alertCtrl.create({
      title: 'Nuova connessione',
      message: 'Connettersi al dispositivo?',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Connetti',
          handler: () => {
            this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);

          }
        }
      ]
    });
    alert.present(

    );

  }

  closeModal() {
    const data = {
      state: this.isConnected,
      btserial: this.bluetoothSerial
    };
    this.view.dismiss(data);
  }

  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      subTitle: msg,
      buttons: ['Ok']
    });
    alert.present();
  }
}
