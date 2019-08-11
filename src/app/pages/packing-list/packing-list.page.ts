import { Component, OnInit } from '@angular/core';
import { TripService } from '../../services/trip/trip.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-packing-list',
  templateUrl: './packing-list.page.html',
  styleUrls: ['./packing-list.page.scss'],
})
export class PackingListPage implements OnInit {

  constructor(
    private tripService: TripService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
  }

}
