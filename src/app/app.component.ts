import { Component, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy {

  auth$;

  public appPages = [
    {title: 'HOME', url: '/home', icon: 'home'},
    {title: 'ITINERARY', url: '/itinerary', icon: 'list'},
    {title: 'PACKING_LIST', url: '/packing-list', icon: 'shirt'},
    {title: 'GUIDES', url: '/guides', icon: 'contacts'},
    {title: 'FAQ', url: '/faq', icon: 'chatbubbles'},
    {title: 'DOCUMENTS', url: '/documents', icon: 'document'}
  ];

  public policyPages = [
    {title: 'WAIVER', url: '/waiver', icon: 'paper'},
    {title: 'PRIVACY_POLICY', url: '/privacy-policy', icon: 'glasses'}
  ];

  public mePages = [
    {title: 'PERSONAL_INFORMATION', url: '/personal-info', icon: 'person'}
  ];

  constructor(
    public auth: AuthService,
    private translate: TranslateService,
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.initTranslate();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.auth$ = this.auth.auth$.subscribe(
      val => {
        if (val) {
          if (this.auth.getCredentials().type === 4) {

            if (!this.appPages.find(e => {
              return e.title === 'PARTICIPANTS';
            })) {
              this.appPages.push(
                {title: 'PARTICIPANTS', url: '/participants', icon: 'people'}
              );
            }
          }
        }
      }
    );
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
    // this.translate.use('zh-cmn-Hans');

  }

  logout() {
    this.auth.logout().then(res => {
      this.router.navigateByUrl('login');
    });
  }

  ngOnDestroy(): void {
    this.auth$.unsubscribe();
  }
}
