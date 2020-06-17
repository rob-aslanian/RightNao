import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalUserProService } from '../../services/global-user-pro.service';

@Component({
  selector: 'app-write-review-service',
  templateUrl: './write-review-service.component.html',
  styleUrls: ['./write-review-service.component.scss']
})
export class WriteReviewServiceComponent implements OnInit {

  @Input() profile;
  @Output() result: EventEmitter<any> = new EventEmitter<any>();

  ratingClarity: number = 1;
  ratingComm: number = 1;
  ratingPromp: number = 1;
  hire: string = 'not_answer';
  text: string = '';
  isCompanyActive: boolean = false;
  profileId: string ;

  constructor(
    private globalUserProService: GlobalUserProService
  ) { 
     this.isCompanyActive = globalUserProService.isCompanyActive();
     this.profileId = globalUserProService.getProfileId();
  }

  ngOnInit() {
 
    
  }

  submit() {

      this.result.emit({
          profile_id: this.profileId,
          is_company: this.isCompanyActive,
          clarity: this.ratingClarity,
          communication: this.ratingComm,
          payment: this.ratingPromp, 
          hire: this.hire,
          description: this.text
      })
  }

}
