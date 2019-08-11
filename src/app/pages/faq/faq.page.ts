import { Component, OnInit } from '@angular/core';
import { TripService } from '../../services/trip/trip.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ApiService } from '../../services/api/api.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpHeaders } from '@angular/common/http';
import { Question } from '../../models/question';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  private questionForm: FormGroup;
  private translations: any;

  constructor(
    private tripService: TripService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private api: ApiService,
    private translate: TranslateService
  ) {
    this.questionForm = this.formBuilder.group({
      question: ['', Validators.compose([
        Validators.required,
        Validators.minLength(20)
      ])]
    });
  }

  ngOnInit() {
    this.getTranslations();
  }

  /**
   * Get all the translations needed by the component
   */
  getTranslations(): void {
    this.translate.get([
      'SENDING_QUESTION_TO_SERVER',
      'SERVER_ERROR'
    ]).subscribe(res => this.translations = res);
  }

  /**
   * Submit a new question to the trip
   */
  submitQuestion(): void {

    /* let loading = this.loadingCtrl.create({
      content: this.translations.SENDING_QUESTION_TO_SERVER
    });

    loading.present();*/

    // Prepare the POST request and send it

    const endpoint = 'trip-questions',
      params = {
        question: this.questionForm.value.question,
        trip_id: this.tripService.trip.id
      },
      options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: ' Bearer ' + this.auth.getCredentials().accessToken
      })
    };

    this.api.post(endpoint, params, options).subscribe(
      (response: any) => {

        if (response.id !== null) {

          this.questionForm.reset();

          /*
           * Response should be the question created
           * {
           *   "question": "...text",
           *   "trip_id": 666,
           *   "answer": "",
           *   "created_by": 120,
           *   "updated_by": 120,
           *   "created_at": 1534075495,
           *   "updated_at": 1534075495
           * }
           * We can use it to create a new question and display it
           */
          const newQuestion = new Question(
            response.question,
            response.answer,
            response.created_at,
            null
          );

          this.tripService.trip.questions.push(newQuestion);

          // loading.dismissAll();
          this.questionForm.reset();

        } else {

          // There was some error
          // loading.dismissAll();
          console.error(
            'There was some error posting the question: ' +
            JSON.stringify(response));

          /*let toast = this.toastCtrl.create({
            message: this.translations.SERVER_ERROR,
            dismissOnPageChange: true
          });

          toast.present();*/

        }
      }
    );

    console.log('Submit' + this.questionForm.value.question);

  }

}
