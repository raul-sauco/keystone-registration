import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';

/** password and password confirm controls value must match */
export const passwordMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');

  return password && passwordConfirm && password.value !== passwordConfirm.value ? { passwordMismatch: true } : null;
};

@Directive({
  selector: '[appPasswordMatchValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordMatchValidatorDirective, multi: true }]
})
export class PasswordMatchValidatorDirective {
  static validate(control: AbstractControl): ValidationErrors {
    return passwordMatchValidator(control);
  }
}
