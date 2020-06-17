import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
 
import { utilities } from 'src/app/_shared/utilities/utilities';
import { NetworkUserService } from 'src/app/_shared/services/network/network-user.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import links from '../models/url';
import { NetworkCompanyService } from 'src/app/_shared/services/network/network-company.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-grow-network-companies',
  templateUrl: './grow-network-companies.component.html',
  styleUrls: ['./grow-network-companies.component.scss']
})
export class GrowNetworkCompaniesComponent implements OnInit {

  toggle:any;
  growNetworkList:any[] = [];
  utils = utilities;
  selectedView:string = 'card';

  @Input() isLandingPage: boolean = false;


  amount:number = 13;
  after:BehaviorSubject<number> = new BehaviorSubject<number>(0); 
  first:number = 6;
  page:number = 1;

  isCompanyActive: boolean;
  companyId: string = '';
  links = links;
  url: any ;
 

  constructor(
    private netwrokService:NetworkUserService,
    private storage: GlobalUserProService,
    private networkCompanyService: NetworkCompanyService

  ) { }

  ngOnInit() {
    
    this.isCompanyActive = this.storage.isCompanyActive();
    if(this.isCompanyActive) {
       this.companyId = this.storage.getComapnyId();
       this.url = this.links.company;
    }
      this.url = this.links.user;
      this.after.subscribe( after => {
          if(after === undefined){
            after = 0;
          } 
          this.netwrokService
          .getSuggestedCompanies(  this.first, after.toString() )
          .subscribe(( {data} :any) => {        
              this.growNetworkList = data['getSuggestedCompanies'];
        });
      } )
      
    
  }

  sort_and_wiew( toggleType:string ){
       this.selectedView = toggleType; 
  }


  follow( companyId:string , idx:number ) :any {
       // Follow if use is active 
      if(!this.isCompanyActive) {
         return this.netwrokService.followCompanyUser(companyId)
                  .subscribe(({data}) => {
                      this.growNetworkList.splice(idx,1);
                });
      } else {
        // Follow if company is Active
      this.networkCompanyService
       .followCompanyForComapny( this.companyId,companyId)
        .subscribe( data =>   this.growNetworkList.splice(idx,1) )
     }
   }

   trackByFn =  (index) => index;

   changePage(e){
    let page = e ===  1 ? 0 : this.first * --e;
    this.after.next(page); 
   }

}
