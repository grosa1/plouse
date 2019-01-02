import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the CostiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-costi',
  templateUrl: 'costi.html',
})
export class CostiPage {

  // Doughnut
  public doughnutChartLabels:string[] = ['Acqua', 'Luce', 'Gas'];
  public doughnutChartData:number[] = [350, 400, 170];
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(public navCtrl: NavController) {

  }
}
