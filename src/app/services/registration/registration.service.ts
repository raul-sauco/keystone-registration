import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  tripId: number;
  tripName: string;
  code: string;
  type: string;

  constructor() { }
}
