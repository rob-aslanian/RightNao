import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';

@Component({
  selector: 'app-article-box',
  templateUrl: './article-box.component.html',
  styleUrls: ['./article-box.component.scss']
})
export class ArticleBoxComponent implements OnInit {

  @Input() article: any;
  @Output() result: EventEmitter<any> = new EventEmitter<any>();

  constructor(
     private userProfileService: UserProfileService
  ) { }

  ngOnInit() { }

  removeArticle( id ) {
        this.userProfileService
        .removePortfolio(id).subscribe( () => this.result.emit({ id, _case: 'delete' }) );
  }

}
