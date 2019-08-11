import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GuidesPage } from './guides.page';
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: GuidesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MarkdownToHtmlModule,
    TranslateModule
  ],
  declarations: [GuidesPage]
})
export class GuidesPageModule {}
