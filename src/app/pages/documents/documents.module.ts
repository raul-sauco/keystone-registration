import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DocumentsPage } from './documents.page';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingSpinnerContentModule } from '../../components/loading-spinner-content/loading-spinner-content.module';

const routes: Routes = [
  {
    path: '',
    component: DocumentsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    LoadingSpinnerContentModule
  ],
  declarations: [DocumentsPage]
})
export class DocumentsPageModule {}
