import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordPage } from './reset-password.page';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingSpinnerContentModule } from '../../components/loading-spinner-content/loading-spinner-content.module';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    LoadingSpinnerContentModule
  ],
  declarations: [ResetPasswordPage]
})
export class ResetPasswordPageModule {}
