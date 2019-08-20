import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { TripCodesHelpComponent } from './trip-codes-help.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  declarations: [TripCodesHelpComponent],
  exports: [TripCodesHelpComponent]
})
export class TripCodesHelpComponentModule {}
