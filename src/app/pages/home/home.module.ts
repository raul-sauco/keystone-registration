import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    TranslateModule,
    MarkdownToHtmlModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
