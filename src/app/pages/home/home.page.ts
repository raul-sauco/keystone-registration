import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private resUrl = 'https://webapp.keystone-adventures.com/images/portal/';

  public cards = [
    {
      title: 'WELCOME_TO_KA',
      content: 'HOME_CARD_WELCOME_MESSAGE',
      imageurl: this.resUrl + 'keystone.jpg'
    },
    {
      title: 'OUR_GOAL',
      content: 'HOME_CARD_OUR_GOAL',
      imageurl: this.resUrl + 'goals.png'
    },
    {
      title: 'STAFF',
      content: 'HOME_CARD_STAFF',
      imageurl: this.resUrl + 'staff.jpg'
    },
    {
      title: 'CHALLENGE_BY_CHOICE',
      content: 'HOME_CARD_CHALLENGE',
      imageurl: this.resUrl + 'challenge.jpg'
    },
    {
      title: 'LOCATIONS',
      content: 'HOME_CARD_LOCATIONS',
      imageurl: this.resUrl + 'locations.jpg'
    },
    {
      title: 'RISK_MANAGEMENT',
      content: 'HOME_CARD_RISK_MANAGEMENT',
      imageurl: this.resUrl + 'risk.jpg'
    }
  ];

  constructor() {}

}
