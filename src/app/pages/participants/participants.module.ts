import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ParticipantsPage } from './participants.page';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingSpinnerContentModule } from '../../components/loading-spinner-content/loading-spinner-content.module';
import { ParticipantModule } from '../../components/participant/participant.module';

const routes: Routes = [
  {
    path: '',
    component: ParticipantsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    LoadingSpinnerContentModule,
    ParticipantModule
  ],
  declarations: [ParticipantsPage]
})
export class ParticipantsPageModule {}
