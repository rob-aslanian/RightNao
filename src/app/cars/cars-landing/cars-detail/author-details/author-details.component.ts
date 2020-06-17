import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { map } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit {
  @Input() isMe:boolean;
  @Input() phones;
  profile;
  isLoading:boolean = true;

  constructor(
    private utilsService:UtilsService,
    private appComponent:AppComponent,
  ) { }

  ngOnInit() {
    this.getProfile('5e16bff7c099e200015689b4');
  }
  getProfile( userId: string ) {
                     this.utilsService
                          .getUserProfileInfo( userId )
                          .subscribe( data => { this.profile = data 
                                                this.isLoading = false;
                                              console.log(data);
                                               } )
}

message() {
  let id = this.profile['id'];
  let name = `${ this.profile.firstname} ${ this.profile.lastname }`;
  let avatar = this.profile.avatar ? this.profile.avatar : 'assets/img/124.svg';
       
  const mutation = this.utilsService.openSmallChatBox({
                        avatar,
                        id,
                        name
                   }).pipe( map( ( { data } ) => data.CreateConversation.id )  )
                   
 mutation.subscribe( ( id ) => this.appComponent.addChatBox(id) );
}

}
