import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  passwordRecoveryForm: FormGroup;
  accountNotFoundMesssage: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.initPasswordRecoveryForm();
  }

  initPasswordRecoveryForm() {
    this.passwordRecoveryForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ]))
    });
  }

  /**
   * Submit email entered by the user for password recovery.
   */
  async submitEmail() {

    const loading = await this.loadingCtrl.create({
      message: this.translate.instant('SENDING_TO_SERVER')
    });

    await loading.present();

    const params = {
      email: this.passwordRecoveryForm.value.email,
      app: 'kareg'
    };

    this.api.post('forgot-password', params).subscribe(
      async (response: any) => {

        await loading.dismiss();

        if (response.error === false) {

          const alert = await this.alertCtrl.create({
            header: this.translate.instant('SUCCESS'),
            message: this.translate.instant('PASSWORD_RECOVERY_EMAIL_SENT'),
            buttons: [this.translate.instant('OK')]
          });

          await alert.present();

        } else if (response.reason === 'NO_ACCOUNT') {

          this.accountNotFoundMesssage = this.translate.instant(
            'ACCOUNT_FOR_EMAIL_NOT_FOUND', {
              email: this.passwordRecoveryForm.value.email
            });

        } else {
          this.notifyServerError();
        }

      }, async (error: any) => {

        console.error(error);
        await loading.dismiss();
        this.notifyServerError();

      }
    );
  }

  /**
   * Inform the user of an error processing the request.
   */
  async notifyServerError() {

    const alert = await this.alertCtrl.create({
      header: this.translate.instant('ERROR'),
      message: this.translate.instant('SERVER_ERROR'),
      buttons: [this.translate.instant('OK')]
    });

    await alert.present();

  }

  /**
   * Clear the account not found error message.
   */
  clearErrors() {
    console.log('clear errors');
    this.accountNotFoundMesssage = null;
  }
}
