import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Student } from '../../models/student';
import { TranslateService } from '@ngx-translate/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private student = null;
  student$: Subject<Student> = new Subject<Student>();
  private retries = 5;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private translate: TranslateService
  ) {
    this.fetchStudent();
  }

  /**
   * Fetch student info from the server.
   */
  fetchStudent() {

    if (this.retries < 0) {
      return false;
    }

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: ' Bearer ' + this.auth.getCredentials().accessToken
      })
    },
    endpoint = 'students/' + this.auth.getCredentials().studentId;

    this.api.get(endpoint, null, options).subscribe(
      async res => {
        this.student = new Student(res, this.translate);
        this.student$.next(this.student);
      }, error => {
        console.error(error);
        this.retries--;
        setTimeout(() => { this.fetchStudent(); }, 2000);
      }
    );
  }

  /**
   * Update the student's provider with the given JSON, and notify subscriptions.
   */
  updateStudentFromJson(json) {
    this.student.setFromJSON(json);
    this.student$.next(this.student);
  }

  getStudent(): Student {
    return this.student;
  }
}
