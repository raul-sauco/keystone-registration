import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { ParticipantService } from '../../services/participant/participant.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.page.html',
  styleUrls: ['./participants.page.scss'],
})
export class ParticipantsPage implements OnInit, OnDestroy {

  participants: Student[] = null;
  totalTeachers: number;
  totalStudents: number;
  private participants$;

  constructor(
    private participantService: ParticipantService
  ) { }

  ngOnInit() {
    this.updateParticipants(this.participantService.participants);
    this.participants$ = this.participantService.participant$.subscribe(
      resp => {
        this.updateParticipants(resp);
      }
    );
  }

  ngOnDestroy(): void {
    this.participants$.unsubscribe();
  }

  /**
   * Update the participants property and the counters.
   */
  updateParticipants(listing): void {

    this.participants = listing;
    this.sortParticipants();

    this.totalTeachers = this.totalStudents = 0;
    this.participants.forEach(p => {
      if (+p.type === 1) {
        this.totalTeachers++;
      } else {
        this.totalStudents++;
      }
    });

  }

  /**
   * Sort the component participants property.
   */
  sortParticipants(): void {

    // Order participants, teachers on top, then last name alphabetically
    this.participants.sort((a, b) => {

      if (a.type === null && b.type === null) { return 0; }
      if (a.type === null) { return -1; }
      if (b.type === null) { return 1; }

      if (a.type === b.type) {

        if (!a.lastName && !b.lastName) { return 0; }
        if (!a.lastName) { return 1; }
        if (!b.lastName) { return -1; }

        return a.lastName.localeCompare(b.lastName);
      }

      return b.type - a.type;
    });

  }
}
