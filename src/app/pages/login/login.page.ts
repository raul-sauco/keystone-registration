import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Credentials } from '../../models/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginForm: FormGroup;
  private loginEndpoint = 'login';
  private translations: any;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.initLoginForm();
    this.getTranslations();
  }

  /**
   * Initialize the login form
   */
  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  /**
   * Get all the needed translations and assign them to a string
   */
  getTranslations(): void {
    this.translate.get([
      'AUTHENTICATION_FAILURE',
      'ERROR',
      'LOGGING_IN',
      'OK',
      'SERVER_ERROR'
    ]).subscribe(
      res => this.translations = res
    );
  }

  /**
   * Send login details to the server and handle response
   */
  async submitLogin() {

    const loading = await this.loadingCtrl.create({
      message: this.translations.LOGGING_IN
    });

    await loading.present();

    const params = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.api.post(this.loginEndpoint, params).subscribe(
      async (response: any) => {

        // Get rid of the loader
        await loading.dismiss();

        if (response.error === true) {

          const alert = await this.alertCtrl.create({
            header: this.translations.ERROR,
            message: this.translations.AUTHENTICATION_FAILURE,
            buttons: [this.translations.OK]
          });

        } else {

          const cred = new Credentials(response.credentials);

          this.auth.setCredentials(cred).then(
            () => {
              this.auth.authenticated = true;
            }).catch(
            error => {
              console.error('Error saving credentials to device: ' + error);
            });

          this.router.navigateByUrl('');

        }
      }, async error => {

        const alert = await this.alertCtrl.create({
          header: this.translations.ERROR,
          message: this.translations.SERVER_ERROR + error,
          buttons: [this.translations.OK]
        });

      }
    );
  }

}
