import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {

  constructor(
    public auth: AuthService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
  }

}
