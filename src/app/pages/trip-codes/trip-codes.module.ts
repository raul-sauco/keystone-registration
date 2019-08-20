import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TripCodesPage } from './trip-codes.page';
import { TranslateModule } from '@ngx-translate/core';
import { TripCodesHelpComponentModule } from '../../components/help-pages/trip-codes-help/trip-codes-help.module';
import { TripCodesHelpComponent } from '../../components/help-pages/trip-codes-help/trip-codes-help.component';

const routes: Routes = [
  {
    path: '',
    component: TripCodesPage
  }
];

@NgModule({
  entryComponents: [
    TripCodesHelpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    TripCodesHelpComponentModule
  ],
  declarations: [TripCodesPage]
})
export class TripCodesPageModule {}
