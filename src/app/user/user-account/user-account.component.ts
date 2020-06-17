import { Component, OnInit } from '@angular/core';
import { GlobalUserProService } from '../../_shared/services/global-user-pro.service';
import { Apollo } from 'apollo-angular';
import { graphqlUserAccount } from '../../_shared/graphql/user-account';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss', '../../_shared/css/account_shared_style.scss']
})
export class UserAccountComponent implements OnInit {
 
  userInfo: any;
  getprofile: Observable<any>;
  constructor(
    private globalUserProfileService: GlobalUserProService,
    private apollo: Apollo,
  ) { }

  ngOnInit() {
  
    let url  = this.globalUserProfileService.getUserId();

    this.getprofile = this.apollo.watchQuery({
      query: graphqlUserAccount.getProfile,
      variables: {
        url,
        lang: "en"
      }
    }).valueChanges.pipe(
      distinctUntilChanged(),
      map((data:any) => this.modifyQuery(data.data.getProfile))
    );
      
  }


  modifyQuery(data){
    data.date_of_registration = data.date_of_registration.replace(/-/g,'/');
    return data;
  }

}
