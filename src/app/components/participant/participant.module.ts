import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ParticipantComponent } from './participant.component';



@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [ParticipantComponent],
  exports: [ParticipantComponent]
})
export class ParticipantModule { }
