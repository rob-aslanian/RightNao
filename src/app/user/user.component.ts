import { Component, OnInit } from '@angular/core';
import { GlobalUserProService } from '../_shared/services/global-user-pro.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private globalService:GlobalUserProService,
    private translateService:TranslateService
  ) { }

  ngOnInit() {
    const defaultLang = this.globalService.getLanguage();     

  }

}
