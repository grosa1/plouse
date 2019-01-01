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

  constructor(private navParams: NavParams,
              private view: ViewController,
              private bluetoothSerial: BluetoothSerial,
              private alertCtrl: AlertController) {
  }

  ionViewWillLoad() {
    const data = this.navParams.get('data');
    console.log(data);
  }

  ngOnInit() {
    //this.startScanning()
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

  success = (data) => alert(data);
  fail = (error) => alert(error);

  selectDevice(address: any) {

    let alert = this.alertCtrl.create({
      title: 'Connect',
      message: 'Do you want to connect with?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Connect',
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
      res: 'ok',
      btserial: this.bluetoothSerial
    };
    this.view.dismiss(data);
  }
}
