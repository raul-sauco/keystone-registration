import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PackingListItemComponent } from './packing-list-item.component';
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MarkdownToHtmlModule
  ],
  declarations: [PackingListItemComponent],
  exports: [PackingListItemComponent]
})
export class PackingListItemModule {}
