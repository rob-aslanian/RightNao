import { Component, OnInit, Input } from '@angular/core';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { LanguageEnum } from 'src/app/_shared/models/shared/shared.models';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss' , '../index.scss']
})
export class UserDetailsComponent implements OnInit {

  @Input() data;

  utils = utilities;
  langEnum = LanguageEnum;

  isShowMore:{
    [type:string]:boolean
  } = {
    'experience':false,
    'education':false,
    'accomplishments':false,
    'languages':false,
    'recommendations':false,
  }

  constructor() { }

  ngOnInit() {
   
  }

  trackByFn =  (index) => index;

  showMore(type:string){
    this.isShowMore[type] = !this.isShowMore[type];
    
    Object.keys(this.isShowMore)
          .map(key => key !== type ? this.isShowMore[key] = false : null)
  }

}
