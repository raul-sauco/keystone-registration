import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student/student.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {

  private attributes = [
    'firstName', 'lastName', 'citizenship', 'travelDocument',
    'gender', 'dob', 'guardianName', 'waiverAccepted', 'waiverSignedOn',
    'dietaryRequirements', 'dietaryRequirementsOther', 'allergies',
    'allergiesOther', 'medicalInformation', 'insurance', 'insuranceName',
    'insurancePolicyNumber'
  ];

  constructor(
    private studentService: StudentService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
  }

  /**
   * Get the CSS class for the attribute value element.
   */
  getAttributeClass(attr) {

    if (typeof this.studentService.getStudent()[attr] === 'boolean') {
      if (this.studentService.getStudent()[attr] === true ||
        this.studentService.getStudent()[attr] === false) {
        return 'student-attr-no-empty';
      } else {
        return 'student-attr-empty';
      }
    }

    if (!this.studentService.getStudent()[attr]) {
      return 'student-attr-empty';
    }

    return  'student-attr-no-empty';

  }

}
