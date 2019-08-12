import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private userRegistrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private reg: RegistrationService
  ) {
    this.initUserRegistrationForm();
  }

  ngOnInit() {}

  /**
   * Initializes the first form of the registration that collects
   * the trip's id and code that students/teachers need to use to
   * register for the trip.
   */
  initUserRegistrationForm() {
    this.userRegistrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6)
      ])]
    });
  }

  /**
   * todo
   * Get the trip ID and registration security code from
   * the user and verify them against the server
   */
  submitUserRegistration() {

    const username = this.userRegistrationForm.value.username,
      password = this.userRegistrationForm.value.password;

    // todo send details to server
    console.log('Sending details. username: ' + username +
      ' email: ' + password + ' trip: ' + this.reg.tripId +
      ' code: ' + this.reg.code);
  }

}
