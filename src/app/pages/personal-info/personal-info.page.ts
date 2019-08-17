import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentService } from '../../services/student/student.service';
import { TranslateService } from '@ngx-translate/core';
import { Student } from '../../models/student';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit, OnDestroy {

  public student: Student = null;
  private student$;
  public attributeTypes;

  constructor(
    private studentService: StudentService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.student = this.studentService.getStudent();
    if (this.student) {
      this.setAttributeTypes();
    }
    this.student$ = this.studentService.student$.subscribe(
      val => {
        this.student = val;
        if (this.student) {
          this.setAttributeTypes();
        }
      }
    );
  }

  ngOnDestroy() {
    this.student$.unsubscribe();
  }

  /**
   * Get the CSS class for the attribute value element.
   */
  getAttributeClass(attr) {

    if (this.student.isAttributeEmpty(attr)) {
      return 'student-attr-empty';
    }

    return  'student-attr-no-empty';

  }

  setAttributeTypes() {

    this.attributeTypes = [
      {
        attrs: this.student.getPersonalAttributes(),
        header: 'PERSONAL_INFO'
      },
      {
        attrs: this.student.getLegalAttributes(),
        header: 'LEGAL'
      },
      {
        attrs: this.student.getDietaryAttributes(),
        header: 'DIETARY_REQUIREMENTS'
      },
      {
        attrs: this.student.getMedicalAttributes(),
        header: 'MEDICAL_INFORMATION'
      },
    ];

  }

}
