import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Student } from '../../models/student';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  participants: Student[] = null;
  participant$: Subject<Student[]> = new Subject<Student[]>();

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private translate: TranslateService
  ) {
    this.init();
  }

  /** Init the service */
  init() {

    this.participants = [];
    this.fetchParticipants();

  }

  /**
   * Fetch all of students for this trip from the backend.
   * todo add pagination and only .next on complete.
   */
  fetchParticipants() {
    this.fetchParticipantBatch('students');
  }

  /**
   * Fetch a batch of participants from the backend
   */
  fetchParticipantBatch(endpoint: string) {

    const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: ' Bearer ' + this.auth.getCredentials().accessToken
        }),
        observe: 'response'
      };

    this.api.get(endpoint, null, options).subscribe(
      (resp: any) => {
        // TODO handle errors

        resp.body.forEach(data => {
          this.participants.push(new Student(data, this.translate));
        });

        // Notify subscribers of the update
        this.participant$.next(this.participants);

        if (this.api.hasNextPage(resp.headers)) {
          this.fetchParticipantBatch(this.api.nextPageUrl(resp.headers));
        }
      });
  }
}
