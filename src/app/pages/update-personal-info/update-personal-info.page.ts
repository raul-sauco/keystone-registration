import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentService } from '../../services/student/student.service';
import { ApiService } from '../../services/api/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../../models/student';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-update-personal-info',
  templateUrl: './update-personal-info.page.html',
  styleUrls: ['./update-personal-info.page.scss'],
})
export class UpdatePersonalInfoPage implements OnInit, OnDestroy {

  public personalInfoForm: FormGroup;
  public student: Student = null;
  private student$;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private translate: TranslateService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    // todo, subscribe to changes on StudentService
    this.student = this.studentService.getStudent();
    if (this.student !== null) {
      this.initPersonalInfoForm();
    }
    this.student$ = this.studentService.student$.subscribe(
      val => {
        this.student = val;
        if (this.student !== null) {
          this.initPersonalInfoForm();
        }
      }
    );
  }

  ngOnDestroy() {
    this.student$.unsubscribe();
  }

  /**
   * Initialize Student's personal information form
   */
  initPersonalInfoForm() {

    this.personalInfoForm = this.formBuilder.group({
      firstName: [this.student.firstName],
      lastName: [this.student.lastName],
      citizenship: [this.student.citizenship],
      travelDocument: [this.student.travelDocument],
      gender: [this.student.gender === null ? null : '' + this.student.gender],
      dob: [this.student.dob],
      guardianName: [this.student.guardianName],
      dietaryRequirements: [this.student.dietaryRequirements === null ? null : '' + this.student.dietaryRequirements],
      dietaryRequirementsOther: [this.student.dietaryRequirementsOther],
      allergies: [this.student.allergies === null ? null : '' + this.student.allergies],
      allergiesOther: [this.student.allergiesOther],
      medicalInformation: [this.student.medicalInformation],
      insurance: [this.student.insurance === null ? null : '' + this.student.insurance],
      insuranceName: [this.student.insuranceName],
      insurancePolicyNumber: [this.student.insurancePolicyNumber]
    });

  }

  /**
   * Handle form submit
   */
  async submitPersonalInfoForm() {

    const params = {
        first_name: this.personalInfoForm.value.firstName,
        last_name: this.personalInfoForm.value.lastName,
        citizenship: this.personalInfoForm.value.citizenship,
        travel_document: this.personalInfoForm.value.travelDocument,
        gender: this.personalInfoForm.value.gender,
        dob: this.personalInfoForm.value.dob ? this.personalInfoForm.value.dob.split('T')[0] : null,
        guardian_name: this.personalInfoForm.value.guardianName,
        waiver_accepted: this.personalInfoForm.value.waiverAccepted,
        waiver_signed_on: this.personalInfoForm.value.waiverSignedOn,
        dietary_requirements: this.personalInfoForm.value.dietaryRequirements,
        dietary_requirements_other: this.personalInfoForm.value.dietaryRequirementsOther,
        allergies: this.personalInfoForm.value.allergies,
        allergies_other: this.personalInfoForm.value.allergiesOther,
        medical_information: this.personalInfoForm.value.medicalInformation,
        insurance: this.personalInfoForm.value.insurance,
        insurance_name: this.personalInfoForm.value.insuranceName,
        insurance_policy_number: this.personalInfoForm.value.insurancePolicyNumber
      },
      loading = await this.loadingCtrl.create({
        message: this.translate.instant('SENDING_TO_SERVER')
      }),
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: ' Bearer ' + this.auth.getCredentials().accessToken
        })
        // observe: 'response'
      },
      endpoint = 'students/' + this.student.id;

    await loading.present();

    this.api.patch(endpoint, params, options).subscribe(
      async res => {

        await loading.dismiss();

        // todo check for errors
        this.studentService.updateStudentFromJson(res);

        const alert = await this.alertCtrl.create({
          header: this.translate.instant('SUCCESS'),
          subHeader: this.translate.instant('DETAILS_UPDATED'),
          buttons: [{
            text: this.translate.instant('OK'),
            role: 'accept',
            handler: () => {
              this.router.navigateByUrl('/personal-info');
            }
          }]
        });

        await alert.present();
      }, error => {
        console.error(error); // todo, check for 422 and show error in field
      }
    );

    console.log(params);
  }

  /**
   * Get a CSS class to display that the attribute does
   * not have a value currently.
   */
  getItemCssClass(attr): string {
    if (!this.personalInfoForm.value[attr]) {
      return 'student-attr-empty';
    }
    return 'student-attr-not-empty';
  }

  async showInsuranceHelpModal() {
    console.log('Displaying Insurance help modal'); // todo
  }

}
