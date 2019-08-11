import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FaqPage } from './faq.page';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe';

const routes: Routes = [
  {
    path: '',
    component: FaqPage
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
    MarkdownToHtmlModule
  ],
  declarations: [FaqPage]
})
export class FaqPageModule {}
