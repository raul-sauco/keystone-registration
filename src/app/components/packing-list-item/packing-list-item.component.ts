import { Component, Input, OnInit } from '@angular/core';
import { TripPackingListItem } from '../../models/tripPackingListItem';

@Component({
  selector: 'packing-list-item',
  templateUrl: './packing-list-item.component.html',
  styleUrls: ['./packing-list-item.component.scss'],
})
export class PackingListItemComponent implements OnInit {

  @Input() pli: TripPackingListItem;

  constructor() { }

  ngOnInit() {}

}
