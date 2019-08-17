import { Component, OnInit } from '@angular/core';
import { TripService } from '../../services/trip/trip.service';

@Component({
  selector: 'app-packing-list',
  templateUrl: './packing-list.page.html',
  styleUrls: ['./packing-list.page.scss'],
})
export class PackingListPage implements OnInit {

  constructor(
    public tripService: TripService
  ) { }

  ngOnInit() {
  }

}
