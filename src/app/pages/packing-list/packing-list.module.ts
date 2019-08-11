import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PackingListPage } from './packing-list.page';
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe';
import { PackingListItemModule } from '../../components/packing-list-item/packing-list-item.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: PackingListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MarkdownToHtmlModule,
    PackingListItemModule,
    TranslateModule
  ],
  declarations: [PackingListPage]
})
export class PackingListPageModule {}
