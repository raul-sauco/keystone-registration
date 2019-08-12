import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration/registration.service';

@Component({
  selector: 'app-trip-codes',
  templateUrl: './trip-codes.page.html',
  styleUrls: ['./trip-codes.page.scss'],
})
export class TripCodesPage implements OnInit {

  private tripCodeForm: FormGroup;
  private translations: any;

  constructor(
    private api: ApiService,
    private reg: RegistrationService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTranslations();
    this.initTripCodeForm();
  }

  /**
   * Get all the needed translations and assign them to a string
   */
  getTranslations(): void {
    this.translate.get([
      'ERROR',
      'LOGGING_IN',
      'OK',
      'SENDING_CODES_TO_SERVER',
      'SERVER_ERROR',
      'TRY_AGAIN_LATER'
    ]).subscribe(
      res => this.translations = res
    );
  }

  /**
   * Initializes the first form of the registration that collects
   * the trip's id and code that students/teachers need to use to
   * register for the trip.
   */
  initTripCodeForm() {
    this.tripCodeForm = this.formBuilder.group({
      tripId: ['', Validators.required],
      code: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6)
      ])]
    });
  }

  /**
   * todo
   * Get the trip ID and registration security code from
   * the user and verify them against the server
   */
  async submitTripCodes() {

    const params = {
        id: this.tripCodeForm.value.tripId,
        code: this.tripCodeForm.value.code,
        lang: this.translate.currentLang
      },
      endpoint = 'r';

    const loading = await this.loadingCtrl.create({
      message: this.translations.SENDING_CODES_TO_SERVER
    });

    await loading.present();

    this.api.post(endpoint, params).subscribe(
      async (response: any) => {

        await loading.dismiss();

        if (response.error === false) {

          /*
           * response = {
           *   error: false,
           *   registration: 'student' | 'teacher'
           *   trip: {
           *     id: 143,
           *     name: 'Hogwarts school of witchcr...'
           *   }
           * }
           */
          this.reg.tripId = response.trip.id;
          this.reg.code = params.code;
          this.reg.tripName = response.trip.name;
          this.reg.type = response.registration;

          this.router.navigateByUrl('/register');

        } else {

          this.tripCodeForm.reset();

          const alert = await this.alertCtrl.create({
            header: this.translations.ERROR,
            message: response.message,
            buttons: [this.translations.OK]
          });

          await alert.present();

        }

      }, async () => {

        this.tripCodeForm.reset();

        const alert = await this.alertCtrl.create({
          header: this.translations.ERROR,
          subHeader: this.translations.SERVER_ERROR,
          message: this.translations.TRY_AGAIN_LATER,
          buttons: [this.translations.OK]
        });

        await alert.present();
      }
    );
  }

}
