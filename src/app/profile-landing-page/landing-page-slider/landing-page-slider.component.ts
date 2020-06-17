import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NetworkUserService } from 'src/app/_shared/services/network/network-user.service';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { switchMap, mergeMap, map, takeUntil } from 'rxjs/operators';
import { SearchService } from 'src/app/search/search.service';
import { SearchCompanyInput } from 'src/app/search/models/search.model';
 


@Component({
  selector: 'app-landing-page-slider',
  templateUrl: './landing-page-slider.component.html',
  styleUrls: ['./landing-page-slider.component.scss']
})
export class LandingPageSliderComponent implements OnInit, OnDestroy {

  @Input() isUser: boolean; 

  destroy$:Subject<any> = new Subject<any>();
  slider: any[] = [];
  counter: number = 3;
  length: number =  0;

  after:   number = 0;
  isCompanyActive: boolean;  
  companyID: string; 
  pagination: BehaviorSubject<number> = new BehaviorSubject<number>(this.after);
  query: Function;
  SearchCompanyInput = SearchCompanyInput;
  $destroy: Subject<any> = new Subject<any>();

  constructor(
    private networkService: NetworkUserService,
    private globalUserPro: GlobalUserProService,
    private utilsService: UtilsService, 
    private searchService: SearchService
  ) { }

  ngOnInit() {

    this.isCompanyActive = this.globalUserPro.isCompanyActive(); 

    if(this.isCompanyActive) this.companyID = this.globalUserPro.getComapnyId() 

    this.query = 
     // Company profile is Active
     !this.isCompanyActive ? this.isUser ? this.getPeopleYouKnow : this.getCompaniesYouKnow  : 
      
     // User profile is Active 
     this.isUser ? this.getPeopleYouKnow :  this.getSuggestedCompaniesForCompany;


    this.pagination.pipe(
      switchMap( ( after: number ) => this.query( after ) )
    ).subscribe( ( data: any[] ) => {
           this.slider = data;          
           if( this.isCompanyActive && this.after === 0 && !data.length && !this.isUser) {
                 this.getCompaniesSearchResult().subscribe( (data) => this.slider = data );
           }
    } )    
  }
  
  prev() {
      this.after -= 3;
      this.pagination.next(this.after);
  }
  
  next() {
     this.after += 3;
     if( this.slider.length !== 3 ) this.after = 0;      
     this.pagination.next(this.after);
  }

  getPeopleYouKnow( after: number ): Observable<any> {
    return this.networkService
               .getFriendSuggestionsPag( after ).pipe(
                  takeUntil(this.$destroy),
                  map( ({ data }) => {
                      return data['getFriendSuggestions'].map( ({ user_profile }) => user_profile )
                  } )
               );
    };


  getCompaniesYouKnow( after: number ): Observable<any> {
    return this.networkService
              .getSuggestedCompaniesPag( after ).pipe(
                 takeUntil(this.$destroy),
                 map( ({ data }) => {
                      return data['getSuggestedCompanies'].map( ({ company_profile }) => company_profile )
                  } )
              );
    };

  getSuggestedCompaniesForCompany() : Observable<any> {
       return this.utilsService
                .companySuggestionsForCompany( this.companyID,  this.after.toString(), 3 ).pipe(
                    takeUntil(this.$destroy),
                    map( ({ data }) => {
                        return data['getSuggestedCompaniesForCompany'].map( ({ company_profile }) => company_profile )
                    } )
                );

  };

  getCompaniesSearchResult(): Observable<any> {
      return this.searchService
                 .searchCompanies( new this.SearchCompanyInput(), {
                      first: 3,
                      after: "0"
                 } ).pipe(
                   map(({ company }) => company)
                 )
  };


  followUserToCompany(userID: string, index: number) {

    this.utilsService
                .followUserToCompany(this.companyID, userID)
                .pipe(takeUntil(this.$destroy))
                .subscribe( )

    this.slider[index]['follow'] = true;

  };

  followCompany(companyID: string, index: number ) {
   
     this.networkService
               .followCompanyUser(companyID)
               .pipe(takeUntil(this.$destroy))
               .subscribe( );

     this.slider[index]['follow'] = true;

  }


  connectUser(userID: string, index: number ) {

     this.networkService
               .sendFriendRequest(userID)
               .pipe(takeUntil(this.$destroy))
               .subscribe( );

     this.slider[index]['follow'] = true ;

  };     

   ngOnDestroy(): void {
       this.$destroy.next();
       this.$destroy.complete();
   }
}
