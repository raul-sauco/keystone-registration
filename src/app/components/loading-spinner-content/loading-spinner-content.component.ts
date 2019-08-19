import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-spinner-content',
  templateUrl: './loading-spinner-content.component.html',
  styleUrls: ['./loading-spinner-content.component.scss'],
})
export class LoadingSpinnerContentComponent implements OnInit {

  @Input() message = 'LOADING';

  constructor() { }

  ngOnInit() {}

}
