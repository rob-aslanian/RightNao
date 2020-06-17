import { Component, OnInit, Input } from '@angular/core';
import { NetworkUserService } from 'src/app/_shared/services/network/network-user.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { NetworkCompanyService } from 'src/app/_shared/services/network/network-company.service';
import links from '../models/url';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { zip, BehaviorSubject } from 'rxjs';
import { utilities } from 'src/app/_shared/utilities/utilities';
 
 

@Component({
  selector: 'app-grow-network-people',
  templateUrl: './grow-network-people.component.html',
  styleUrls: ['./grow-network-people.component.scss']
})


export class GrowNetworkPeopleComponent implements OnInit {
  
  @Input() isLandingPage: boolean = false;
  amount:number = 3; 
  after:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  first:number = 2;
  page:number = 1;

  toggleBar: string = 'card'
  growNetworkList:any[] = [];
  isCompanyActive: boolean;
  companyId: string = '';
  links = links;
  url: any ;
   
  utilites = utilities;


  constructor(

    private networkService: NetworkUserService,
    private storage: GlobalUserProService,
    private networkCompanyService: NetworkCompanyService,
    private utilsService: UtilsService,

  ) { }

  ngOnInit() {
    this.isCompanyActive = this.storage.isCompanyActive();
    if( this.isCompanyActive ) {
        this.url = this.links.company;
        this.companyId = this.storage.getComapnyId()
    }
        this.url = this.links.user;
        this.getSuggestion();
  }

  getSuggestion(){

    this.after.subscribe((after) => {
      if(after === undefined){
            after = 0;
       } 
 
      this.networkService
          .getFriendSuggestions(this.first, after.toString())
          .subscribe( ( data ) => this.growNetworkList = data );
    })

        
  }


  sort_and_wiew(type:string){      
      this.toggleBar = type;
    }



  connect( userId: string , idx: number ): void {
      this.networkService
      .sendFriendRequest(userId)     
          .subscribe(({data}) => {
              this.growNetworkList.splice(idx,1);
            });
    }

  follow( userId: string , idx: number ): void {
     this.networkCompanyService
      .followForCompany(this.companyId, userId)
      .subscribe( data =>  this.growNetworkList.splice(idx,1) )
  }

  trackByFn =  (index) => index;

  changePage(e){
    let page = e ===  1 ? 0 : this.first * --e;
    this.after.next(page); 
   }
   
}
