import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Manage } from '../../../_shared/graphql/network/manage';
import { RecommendationService } from 'src/app/_shared/services/recommendation.service';

@Component({
  selector: 'app-blocklist',
  templateUrl: './blocklist.component.html',
  styleUrls: ['./blocklist.component.scss']
})
export class BlocklistComponent implements OnInit {

  blockList: any[] = [];
  blockListLength:number;
  
  constructor( 
    private apollo:Apollo,
    private recommend:RecommendationService
    ) { }

  ngOnInit() {
    let usersQuery:Observable<any> = this.apollo.watchQuery({
      fetchPolicy: "network-only",
      query: Manage.getBlockedUsersOrCompanies,
    }).valueChanges.pipe(
      map( (data:any) => data.data.getBlockedUsersOrCompanies)
    );

    usersQuery.subscribe( data => {
      this.blockListLength = data.length;
      let concatData = this.blockList.concat(data);
      this.blockList = concatData;
      console.log(this.blockList);
    });
  }

  unBlock(item,index){  
    this.blockList.splice(index,1)
    this.blockListLength = this.blockListLength  -1;
    if( item.is_company ){
         this.recommend.unblockCompany(item.id)
         .subscribe(data => console.log(data));
      }
    else{
        this.recommend.unblockUser(item.id)
        .subscribe(data  => console.log(data));
    }
  }
}
