import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  passwordResetForm: FormGroup;
  private token: null;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private route: ActivatedRoute
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
    // todo check if token is still valid
    this.initPasswordResetForm();
    this.route.paramMap.subscribe(next => {
      this.token = next.params.token;
    });
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
    };

    console.log(params);
    // todo send to server

    /*
    this.api.post('reset-password', params).subscribe(
      async (response: any) => {
        const alert = await this.alertCtrl.create({
          header: this.translate.instant('SUCCESS'),
          message: this.translate.instant('PASSWORD_UPDATED'),
          buttons: [this.translate.instant('OK')]
        });
      }, error => {
        console.log(error); // todo email not found and all that
      }
    );
    */
  }
}
