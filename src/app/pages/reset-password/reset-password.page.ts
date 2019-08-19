import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  passwordResetForm: FormGroup;
  validating = true;
  isTokenValid = false;
  userData: any = null;
  private token: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * Validate if the passwords are identical, fail otherwise.
   * todo extract this method and RegisterPage into a class
   * todo display error message if not match
   */
  static passwordMatchValidator(g: FormGroup) {

    if (g.get('password').value.length < 8) {

      return {too_short: true};

    }

    return g.get('password').value === g.get('passwordRepeat').value
      ? null : {mismatch: true};
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.token = params.get('token');
        this.validateToken();
        this.initPasswordResetForm();
      }
      // todo check if token is still valid
    );
  }

  /**
   * Check the validity of the token against the backend.
   * If the token is invalid let the user go to the forgot-password page.
   */
  validateToken() {

    const endpoint = 'reset-password?token=' + this.token;

    this.api.get(endpoint).subscribe(
      (res: any) => {

        if (!res.error) {
          this.isTokenValid = true;
          this.userData = res.user;
        } else {
          this.isTokenValid = false;
        }

        setTimeout(() => {
          this.validating = false;
        }, 2000);
        console.log('Setting validating to ' + this.validating);

      }, () => {
        this.validating = false;
        console.log('Setting validating to ' + this.validating);
      }
    );

  }

  initPasswordResetForm() {

    this.passwordResetForm = this.formBuilder.group({
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      passwordRepeat: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]
    }, {validator: ResetPasswordPage.passwordMatchValidator});

  }

  async submitNewPassword() {

    const loading = await this.loadingCtrl.create({
      message: this.translate.instant('SENDING_TO_SERVER')
    });

    await loading.present();

    const params = {
      password: this.passwordResetForm.value.password,
      token: this.token
    },
    endpoint = 'reset-password/' + this.userData.id;

    this.api.patch(endpoint, params).subscribe(
      async (response: any) => {

        await loading.dismiss();

        const alert = await this.alertCtrl.create({
          header: this.translate.instant('SUCCESS'),
          message: this.translate.instant('PASSWORD_UPDATED'),
          buttons: [{
            text: this.translate.instant('OK'),
            handler: () => {
              this.router.navigateByUrl('/login');
            }
          }]
        });

        await alert.present();
      }, async (error: any) => {
        await loading.dismiss();
        console.log(error); // todo email not found and all that
      }
    );

  }

}
