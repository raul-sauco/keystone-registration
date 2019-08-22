import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordMatchValidatorDirective } from './password-match-validator.directive';

@NgModule({
  declarations: [PasswordMatchValidatorDirective],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
