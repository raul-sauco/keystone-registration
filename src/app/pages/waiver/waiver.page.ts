import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student/student.service';

@Component({
  selector: 'app-waiver',
  templateUrl: './waiver.page.html',
  styleUrls: ['./waiver.page.scss'],
})
export class WaiverPage implements OnInit {

  public waiverForm: FormGroup;
  public today: string;
  public student: Student = null;
  public student$;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.student = this.studentService.getStudent();
    this.student$ = this.studentService.student$.subscribe(
      val => { this.student = val; }
    );
    this.today = new Date().toISOString().split('T')[0];
    this.initWaiverForm();
  }

  /**
   * Initializes the waiver form
   */
  initWaiverForm(): void {

    this.waiverForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      guardianName: ['', Validators.required],
      date: [this.today, Validators.required]
    });

  }

  /**
   * Handle submission of the waiver.
   */
  async acceptWaiver() {

    const params = {
        waiver_accepted: true,
        waiver_signed_on: this.waiverForm.value.date.split('T')[0],
        guardian_name: this.waiverForm.value.guardianName,
        first_name: this.waiverForm.value.firstName,
        last_name: this.waiverForm.value.lastName
      },
      endpoint = 'students/' + this.auth.getCredentials().studentId,
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: ' Bearer ' + this.auth.getCredentials().accessToken
        })
        // observe: 'response'
      },
      loading = await this.loadingCtrl.create({
        message: this.translate.instant('SENDING_TO_SERVER')
      });

    await loading.present();

    this.api.patch(endpoint, params, options).subscribe(
      async res => {

        this.studentService.updateStudentFromJson(res);

        await loading.dismiss();

        const alert = await this.alertCtrl.create({
          header: this.translate.instant('SUCCESS'),
          subHeader: this.translate.instant('DETAILS_UPDATED'),
          message: this.translate.instant('WAIVER_HAS_BEEN_ACCEPTED'),
          buttons: [this.translate.instant('OK')]
        });

        if (this.student.isAttributeEmpty('citizenship') ||
          this.student.isAttributeEmpty('travelDocument') ||
          this.student.isAttributeEmpty('dob')) {
          this.router.navigateByUrl('/update-personal-info');
        }

        await alert.present();

      },
      async error => {
        await loading.dismiss();
        this.displayError(this.translate.instant('SERVER_ERROR'));
      }
    );
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

}
