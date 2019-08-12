import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { TripService } from './services/trip/trip.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {title: 'HOME', url: '/home', icon: 'home'},
    {title: 'ITINERARY', url: '/itinerary', icon: 'list'},
    {title: 'PACKING_LIST', url: '/packing-list', icon: 'shirt'},
    {title: 'GUIDES', url: '/guides', icon: 'contacts'},
    {title: 'FAQ', url: '/faq', icon: 'chatbubbles'},
    {title: 'DOCUMENTS', url: '/documents', icon: 'document'}
  ];

  constructor(
    private auth: AuthService,
    private translate: TranslateService,
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private tripService: TripService
  ) {
    this.initializeApp();
    this.initTranslate();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initTranslate() {

    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    // todo delete the next line after tests
    this.translate.use('zh-cmn-Hans');

  }

  logout() {
    this.auth.logout().then(res => {
      this.router.navigateByUrl('login');
    });
  }
}
