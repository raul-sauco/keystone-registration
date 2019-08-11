import { Component, OnInit } from '@angular/core';
import { TripService } from '../../services/trip/trip.service';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.page.html',
  styleUrls: ['./guides.page.scss'],
})
export class GuidesPage implements OnInit {

  constructor(
    private tripService: TripService
  ) { }

  ngOnInit() {
  }

}
