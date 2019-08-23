import { Component, OnInit } from '@angular/core';
import { TripService } from '../../services/trip/trip.service';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.page.html',
  styleUrls: ['./itinerary.page.scss'],
})
export class ItineraryPage implements OnInit {

  public objectKeys = Object.keys;

  constructor(
    public tripService: TripService
  ) { }

  ngOnInit() { }

}
