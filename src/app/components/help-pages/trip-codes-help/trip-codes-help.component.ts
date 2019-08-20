import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-trip-codes-help',
  templateUrl: './trip-codes-help.component.html',
  styleUrls: ['./trip-codes-help.component.scss'],
})
export class TripCodesHelpComponent {

  @Input() language: string;

  constructor(
    private modalCtrl: ModalController
  ) { }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
