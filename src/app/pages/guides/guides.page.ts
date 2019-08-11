import { Component, OnInit } from '@angular/core';
import { TripService } from '../../services/trip/trip.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.page.html',
  styleUrls: ['./guides.page.scss'],
})
export class GuidesPage implements OnInit {

  constructor(
    private tripService: TripService,
    private translate: TranslateService
  ) { }

  ngOnInit() {}

}
