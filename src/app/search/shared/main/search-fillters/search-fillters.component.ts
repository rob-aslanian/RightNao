import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/search/search.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SearchByType } from 'src/app/search/models/search.model';
import { ISearchCompany, ISearchJob, ISearchCandidate, ISearchUser, ISearchService, ISearchServiceRequest } from 'src/app/search/models/search.interface';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-fillters',
  templateUrl: './search-fillters.component.html',
  styleUrls: ['./search-fillters.component.scss']
})
export class SearchFilltersComponent implements OnInit {

  isCompanyActive:boolean;
  fillters = {
    SearchCompanyFilterFragment:[],
    UserSearchFilterFragment:[],
    SearchCandidateFilterFragment:[],
    SearchJobFilterFragment:[],
    SearchServiceFilterFragment:[],
    SearchServiceRequestFilterFragment:[],
  };

  filtersObservable:Observable<any>;

  constructor(
    private searchService:SearchService,
    private router:Router
  ) { 
    this.isCompanyActive = searchService.isCompanyActive;
  }

  ngOnInit() {

    
  }
  
  open(drop:NgbDropdown){
    this.filtersObservable =  this.searchService
                                  .getFillters()
                                  .pipe(map((data:any) => {
                                      data.map((el) => {
                                          if(!this.fillters[el.__typename].some(fl => fl === el)){
                                            this.fillters[el.__typename].push(el);
                                          }
                                      })
                                      return data;
                                    })
                                  )

    drop.isOpen() ? drop.close() : drop.open();
  }

  selectFilter(type:SearchByType , filter:(
                ISearchUser | ISearchCompany | 
                ISearchJob | ISearchCandidate |
                ISearchService | ISearchServiceRequest )) {


    if ( type !== this.searchService.type ) {
        this.router.navigate(['/search' , type] , { state:{ filter }, } );
    }
    else{
      this.searchService.searchForm.value.patchValue(filter);
    }

  }

  removeFilter(name:string  , id:string){
     let  filter = this.fillters[name] as any[],
          filterId = filter.findIndex(el => el.id === id);


    if(filterId > -1) {
      
      this.searchService
          .removeFilter(id)
          .subscribe(
            () => {
              filter.splice(filterId , 1);
            }
          )
    }
  }

}
