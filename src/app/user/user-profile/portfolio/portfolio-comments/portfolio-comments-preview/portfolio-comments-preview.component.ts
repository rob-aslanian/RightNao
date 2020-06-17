import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

@Component({
  selector: 'app-portfolio-comments-preview',
  templateUrl: './portfolio-comments-preview.component.html',
  styleUrls: ['./portfolio-comments-preview.component.scss']
})
export class PortfolioCommentsPreviewComponent implements OnInit {

  @Input() comment: any;
  @Output() result: EventEmitter<any> = new EventEmitter<any>();

  userId: string = '';
  commentProfileId: string;
  profileId: string;
  

  constructor(
     private globalUserProService: GlobalUserProService
  ) {
       this.profileId = this.globalUserProService.isCompanyActive() ? 
                        this.globalUserProService.getComapnyId() : 
                        this.globalUserProService.getUserProfile()['id'];
   }

  ngOnInit() {
      this.commentProfileId = this.comment['company_profile'] &&  this.comment.company_profile['id'] || this.comment.user_profile['id'];      
  }


  deleteComment() {
       this.result.emit({
           id: this.comment['id'],
           _case: 'delete'
       })
  }
}
