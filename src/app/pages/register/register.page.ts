import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration/registration.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api/api.service';
import { TranslateService } from '@ngx-translate/core';
import { Credentials } from '../../models/credentials';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private reg: RegistrationService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  private userRegistrationForm: FormGroup;

  /**
   * Validate if the passwords are identical, fail otherwise.
   */
  static passwordMatchValidator(g: FormGroup) {

    if (g.get('password').value.length < 8) {

      return {too_short: true};

    }

    return g.get('password').value === g.get('passwordConfirm').value
      ? null : {mismatch: true};
  }

  ngOnInit() {
    this.initUserRegistrationForm();
  }

  /**
   * Initializes the first form of the registration that collects
   * the trip's id and code that students/teachers need to use to
   * register for the trip.
   */
  initUserRegistrationForm(): void {
    this.userRegistrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.minLength(6)], // todo validate emails
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      passwordConfirm: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]
    }, {validator: RegisterPage.passwordMatchValidator});
  }

  /**
   * POST user details to the server.
   * If successful, it will create a new Student record
   */
  async submitUserRegistration() {

    const params = {
        username: this.userRegistrationForm.value.username,
        password: this.userRegistrationForm.value.password,
        email: this.userRegistrationForm.value.email,
        tripId: this.reg.tripId,
        code: this.reg.code
      },
      loading = await this.loadingCtrl.create({
        message: this.translate.instant('SENDING_TO_SERVER'),
      });

    await loading.present();

    this.api.post('r', params).subscribe(
      async (response: any) => {

        if (response.error === true) {

          await loading.dismiss();
          await this.displayError(JSON.stringify(response.errors));

        } else {

          const cred = new Credentials(response.credentials);
          this.auth.setCredentials(cred).then(
            async () => {
              await loading.dismiss();
              await this.displayRegistrationSuccess();
            }
          );
        }
      }, async () => {

        await loading.dismiss();
        await this.displayError(this.translate.instant('SERVER_ERROR'));

      });

  }

  /**
   *  Display an error to the user
   */
  async displayError(message: string) {

    const alert = await this.alertCtrl.create({
      header: this.translate.instant('ERROR'),
      message,
      buttons: [this.translate.instant('OK')]
    });

    await alert.present();
  }

  /**
   *  Display an alert to inform the user of registration success.
   */
  async displayRegistrationSuccess() {

    const alert = await this.alertCtrl.create({
      header: this.translate.instant('SUCCESS'),
      subHeader: this.translate.instant('REGISTRATION_IS_COMPLETE'),
      message: this.translate.instant('WRITE_YOUR_USER_NAME_SOMEWHERE', {
        name: this.auth.getCredentials().userName
      }),
      buttons: [{
        text: this.translate.instant('OK'),
        role: 'accept',
        handler: () => { this.router.navigateByUrl('/home'); }
      }]
    });

    await alert.present();
  }

}
