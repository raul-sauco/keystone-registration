import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-trip-codes',
  templateUrl: './trip-codes.page.html',
  styleUrls: ['./trip-codes.page.scss'],
})
export class TripCodesPage implements OnInit {

  private tripCodeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.initTripCodeForm();
  }

  ngOnInit() {
  }

  /**
   * Initializes the first form of the registration that collects
   * the trip's id and code that students/teachers need to use to
   * register for the trip.
   */
  initTripCodeForm() {
    this.tripCodeForm = this.formBuilder.group({
      tripId: ['', Validators.required],
      code: ['', Validators.compose([
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
  submitTripCodes() {

    const tripId = this.tripCodeForm.value.tripId,
      code = this.tripCodeForm.value.code;

    // todo send details to server
    console.log('Sending details. trip: ' + tripId +
      ' code: ' + code);
  }

}
