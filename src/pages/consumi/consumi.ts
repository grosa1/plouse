import {Component, NgZone, ViewChild} from '@angular/core';
import {IonicPage, NavController, ModalController, ModalOptions, Modal} from 'ionic-angular';
import {BluetoothSerial} from '@ionic-native/bluetooth-serial';
import {BaseChartDirective} from "ng2-charts";

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
  btColorA = "danger";
  btnTextB = "OFF";
  btColorB = "danger";

  corrente = 0;
  consumoMin = 0;
  consumoMed = 0;
  consumoMax = 0;
  potenza = 0;

  //###########CHART SETUP
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  public lineChartData = [{data: [0], label: 'Cosumo corrente (Watt)'}];
  public lineChartLabels:Array<any> = [""];
  public lineChartOptions:any = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  public lineChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(244, 67, 54, 0.2)',
      borderColor: 'rgba(244, 67, 54, 1)',
      pointBackgroundColor: 'rgba(244, 67, 54, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(244, 67, 54, 0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(private bluetoothSerial: BluetoothSerial,
              public navCtrl: NavController,
              private ngZone: NgZone,
              private modal: ModalController) {

    bluetoothSerial.enable();
  }

  data() {
    setInterval(() => {
      this.read1();
    }, 1000);
  }

  read() {
    this.bluetoothSerial.read().then((data) => {
      if (data) {
        let dataJson = JSON.parse(data);
        this.corrente = dataJson["corrente"];
        this.potenza = dataJson["potenza"];

        this.updateChart(this.potenza);

        if(this.potenza != 0) {
          if ((this.consumoMin == 0) || (this.corrente < this.consumoMin)) {
            this.consumoMin = this.consumoMax;
          }

          if (this.potenza > this.consumoMax) {
            this.consumoMax = this.potenza;
          }

          let mean = (this.consumoMed + this.potenza) / 2;
          this.consumoMed = parseFloat(mean.toFixed(2));
        }
        // console.table(data);
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
      this.btColorA = "danger";
    } else {
      this.bluetoothSerial.write("A");
      this.btnTextA = "ON";
      this.btColorA = "secondary";
    }
  }

  btn_b() {
    if (this.btnTextB == "ON") {
      this.bluetoothSerial.write("b");
      this.btnTextB = "OFF";
      this.btColorB = "danger";
    } else {
      this.bluetoothSerial.write("B");
      this.btnTextB = "ON";
      this.btColorB = "secondary";
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
      if(this.isConnected == true) {
        this.data()
      }
    });
  }

  private updateChart(data) {
      let chart = this.chart.chart;
      let label = "";

    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      if(dataset.data.length > 10) {
        dataset.data.shift();
        chart.data.labels.shift();
      }
      dataset.data.push(data);
      console.log(JSON.stringify(dataset.data))
    });
    // this.lineChartData = [{data: [8, 7, 6, 5, 4, 3, 2], label: 'Luce'}];
    this.chart.chart.update();
  }

}
