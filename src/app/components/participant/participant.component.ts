import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../../models/student';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss'],
})
export class ParticipantComponent implements OnInit {

  @Input() participant: Student;
  @Input() index: number;

  constructor() { }

  ngOnInit() {}

}
