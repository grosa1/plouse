import { Component, NgZone } from '@angular/core';
import {IonicPage, NavController, AlertController, ModalController, ModalOptions, Modal} from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
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
  message: String;
  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;
  A_ON = "A";
  A_OFF = "a";
  B_ON = "B";
  B_OFF = "b";

  constructor(private bluetoothSerial: BluetoothSerial,
              private alertCtrl: AlertController,
              public navCtrl: NavController,
              private ngZone: NgZone,
              private modal: ModalController) {

    bluetoothSerial.enable();
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


  data() {
    setInterval(() => {
      this.read1();
    }, 3000);
  }

  read() {
    this.bluetoothSerial.read().then((data) => {
      if (data) {
        this.message = data;
        console.log(data);
      }
      // let dataJson = JSON.parse(data);
      // let data1 = dataJson["corrente"];
      // let data2 = dataJson["potenza"];
      // console.log("data");
      // console.log(data1);
      // console.log(data2);
    });

  }

  read1() {
    this.ngZone.run(() => {
      this.read();
    })
  }

  send(value) {
    this.bluetoothSerial.write(value).then((res) => {
      console.log(value + ", " + res);
    });
  }

  openModal() {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModalData = {
      name: 'Paul Halliday',
      occupation: 'Developer'
    };

    const myModal: Modal = this.modal.create('ModalPage', { data: myModalData }, myModalOptions);

    myModal.present();

    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
      console.log(data);
      this.bluetoothSerial = data['btserial'];
    });

    myModal.onWillDismiss((data) => {

    });

  }

}
