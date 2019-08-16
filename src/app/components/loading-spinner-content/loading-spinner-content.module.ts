import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoadingSpinnerContentComponent } from './loading-spinner-content.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  declarations: [LoadingSpinnerContentComponent],
  exports: [LoadingSpinnerContentComponent]
})
export class LoadingSpinnerContentModule {}
