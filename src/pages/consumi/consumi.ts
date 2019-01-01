import {Component, NgZone} from '@angular/core';
import {IonicPage, NavController, AlertController, ModalController, ModalOptions, Modal} from 'ionic-angular';
import {BluetoothSerial} from '@ionic-native/bluetooth-serial';

/**
 * Generated class for the ConsumiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consumi',
  templateUrl: 'consumi.html',
})
export class ConsumiPage {
  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;
  isConnected = false;

  btnTextA = "OFF";
  btnTextB = "OFF";

  corrente = 0;
  potenza = 0;

  constructor(private bluetoothSerial: BluetoothSerial,
              private alertCtrl: AlertController,
              public navCtrl: NavController,
              private ngZone: NgZone,
              private modal: ModalController) {

    bluetoothSerial.enable();
  }

  data() {
    setInterval(() => {
      this.read1();
    }, 3000);
  }

  read() {
    this.bluetoothSerial.read().then((data) => {
      if (data) {
        let dataJson = JSON.parse(data);
        this.corrente = dataJson["corrente"];
        this.potenza = dataJson["potenza"];
      }
    });

  }

  read1() {
    this.ngZone.run(() => {
      this.read();
    })
  }

  btn_a() {
    if (this.btnTextA == "ON") {
      this.bluetoothSerial.write("a");
      this.btnTextA = "OFF";
    } else {
      this.bluetoothSerial.write("A");
      this.btnTextA = "ON";
    }
  }

  btn_b() {
    if (this.btnTextB == "ON") {
      this.bluetoothSerial.write("b");
      this.btnTextB = "OFF";
    } else {
      this.bluetoothSerial.write("B");
      this.btnTextB = "ON";
    }
  }

  openModal() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModalData = {
      state: this.isConnected
    };

    const myModal: Modal = this.modal.create('ModalPage', {data: myModalData}, myModalOptions);

    myModal.present();

    myModal.onDidDismiss((data) => {
      this.bluetoothSerial = data['btserial'];

      this.isConnected = data['state'];
      if(this.isConnected === true) {
        this.data()
      }
    });
  }

}
