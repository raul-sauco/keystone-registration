import { formatDate} from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export class Student {
  id: number;
  firstName: string;
  lastName: string;
  citizenship: string;
  travelDocument: string;
  gender: number;
  dob: string;
  guardianName: string;
  waiverAccepted: boolean;
  waiverSignedOn: string;
  dietaryRequirements: number;
  dietaryRequirementsOther: string;
  allergies: number;
  allergiesOther: string;
  medicalInformation: string;
  insurance: boolean;
  insuranceName: string;
  insurancePolicyNumber: string;

  private translations: any;

  constructor(json: any, private translate: TranslateService) {
    this.id = json.id;
    this.firstName = json.first_name;
    this.lastName = json.last_name;
    this.citizenship = json.citizenship;
    this.travelDocument = json.travel_document;
    this.gender = json.gender;
    this.dob = json.dob;
    this.guardianName = json.guardian_name;
    this.waiverAccepted = json.waiver_accepted === 1 ? true : json.waiver_accepted === 0 ? false : null;
    this.waiverSignedOn = json.waiver_signed_on;
    this.dietaryRequirements = json.dietary_requirements;
    this.dietaryRequirementsOther = json.dietary_requirements_other;
    this.allergies = json.allergies;
    this.allergiesOther = json.allergies_other;
    this.medicalInformation = json.medical_information;
    this.insurance = json.insurance === 1 ? true : json.insurance === 0 ? false : null;
    this.insuranceName = json.insurance_name;
    this.insurancePolicyNumber = json.insurance_policy_number;

    this.getTranslations();
  }

  /**
   * Get all translations from TranslateService
   */
  private getTranslations() {
    this.translate.get([
      'ID', 'FIRST_NAME', 'LAST_NAME', 'CITIZENSHIP', 'TRAVEL_DOCUMENT',
      'GENDER', 'DOB', 'GUARDIAN_NAME', 'WAIVER_ACCEPTED', 'WAIVER_SIGNED_ON',
      'DIETARY_REQUIREMENTS', 'DIETARY_REQUIREMENTS_OTHER', 'ALLERGIES',
      'ALLERGIES_OTHER', 'MEDICAL_INFORMATION', 'INSURANCE', 'INSURANCE_NAME',
      'INSURANCE_POLICY_NUMBER', 'YES', 'NO', 'EMPTY'
    ]).subscribe(
      res => this.translations = res
    );
  }

  /**
   * Get the i18n attribute name.
   */
  public getAttributeLabel(attribute: string) {

    const labels = {
      id: this.translations.ID,
      firstName: this.translations.FIRST_NAME,
      lastName: this.translations.LAST_NAME,
      citizenship: this.translations.CITIZENSHIP,
      travelDocument: this.translations.TRAVEL_DOCUMENT,
      gender: this.translations.GENDER,
      dob: this.translations.DOB,
      guardianName: this.translations.GUARDIAN_NAME,
      waiverAccepted: this.translations.WAIVER_ACCEPTED,
      waiverSignedOn: this.translations.WAIVER_SIGNED_ON,
      dietaryRequirements: this.translations.DIETARY_REQUIREMENTS,
      dietaryRequirementsOther: this.translations.DIETARY_REQUIREMENTS_OTHER,
      allergies: this.translations.ALLERGIES,
      allergiesOther: this.translations.ALLERGIES_OTHER,
      medicalInformation: this.translations.MEDICAL_INFORMATION,
      insurance: this.translations.INSURANCE,
      insuranceName: this.translations.INSURANCE_NAME,
      insurancePolicyNumber: this.translations.INSURANCE_POLICY_NUMBER
    };

    return labels[attribute];

  }

  /**
   * Get the attribute value element content.
   */
  getAttributeText(attr) {

    if (typeof this[attr] === 'boolean') {
      if (this[attr] === true) {
        return this.translations.YES;
      } else if (this[attr] === false) {
        return this.translations.NO;
      } else {
        return this.translations.EMPTY;
      }
    }

    if (!this[attr]) {
      return this.translations.EMPTY;
    }

    // Customize a few attributes
    if (attr === 'waiverSignedOn') {
      return formatDate(
        this[attr],
        'longDate',
        this.translate.currentLang.includes('zh') ? 'zh' : 'en-US'
      );
    }

    return this[attr];

  }
}
