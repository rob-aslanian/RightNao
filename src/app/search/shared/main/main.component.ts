import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../search.service';
import { BehaviorSubject , combineLatest, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ISearchCandidate, ISearchCompany, ISearchUser, ISearchJob, ISearchService, ISearchServiceRequest, ISearchRealEstateRequest } from '../../models/search.interface';
import { SearchByType } from '../../models/search.model';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  destroy$:Subject<any> = new Subject<any>();

  amount:number;
  after:BehaviorSubject<string> = new BehaviorSubject<string>('0');
  first:number = 30;
  page:number = 1;
  isLoading:boolean = true;
  list:any[] = [];
  type:SearchByType;
  view:string;

  listByType = {
    profiles:{
      amount:0,
      data:[]
    },
    company:{
      amount:0,
      data:[]
    },
    job_search_result:{
      amount:0,
      data:[]
    },
    candidate_search_result:{
      amount:0,
      data:[]
    },
    service:{
      amount:0,
      data:[] 
    },
    service_request:{
      amount:0,
      data:[]
    },
    real_estate:{
      amount:0,
      data:[]
    },
  }


  constructor(
    public searchService:SearchService,
  ) { 

  }

  ngOnInit() {
    this.type = this.searchService.type;
    this.view = this.searchService.view;

    if(this.type === 'all') { this.first = 3; }

    combineLatest(this.after , this.searchService.searchCondition).pipe(
        switchMap(([_ , data]) => {
          this.isLoading = true;
          return this.search(data);    
        }),
        takeUntil(this.destroy$),
      ).subscribe(
        (data) => {
          /// For All Type search 
          if(Array.isArray(data) && this.type === 'all'){
            data.map(el => {
              let __data = Object.keys(el)[0];
              this.listByType[__data] = {
                data:el[__data],
                amount:el['amount_of_results']
              }
            })
          } 
          else {
            this.list = data[Object.keys(data)[0]];
            this.amount = data['amount_of_results'];
          }
    

          this.isLoading = false;
        
      },
      (err) => { this.isLoading = false },
      () => { this.isLoading = false; }
      )

  
  }


  search(data?:(ISearchCandidate | ISearchCompany | ISearchUser | ISearchJob |
                ISearchService | ISearchServiceRequest | ISearchRealEstateRequest  )) : Observable<any> {
    return  this.searchService
                .searchAll({
                  first:this.first,
                  after: this.after.getValue()
                } , data)
                .pipe(takeUntil(this.destroy$)) 
  }

  changePage(e){
    let page = e ===  1 ? 0 : this.first * --e;
    
    window.scrollTo({top:0 , behavior:"smooth"})
    this.after.next(String(page)); 
   }

   ngOnDestroy(): void {

      this.destroy$.next();
      this.destroy$.complete();

   }

}
