import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from 'src/app/search/search.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

@Component({
  selector: 'app-search-main-header',
  templateUrl: './search-main-header.component.html',
  styleUrls: ['./search-main-header.component.scss']
})
export class SearchMainHeaderComponent implements OnInit , OnDestroy {

  destroy$:Subject<any> = new Subject<any>();
  keyword:string;
  isAuth:boolean;

  constructor(
    public searchService:SearchService,
    private globalService:GlobalUserProService,
    private activeRouter:ActivatedRoute
  ) { }

  ngOnInit() {
    this.isAuth = this.globalService.isAuthenticated();
    this.parseStateKeyword();
  }

  parseStateKeyword(){
    const keyword = history.state.keyword;

    // History -- state
    if(keyword){
      return this.setKeyword(keyword)
    }
    // Query params 
    else {
      this.activeRouter
          .queryParams
          .pipe(takeUntil(this.destroy$))
          .subscribe(el => {
            const keyword = el['keyword'];
            
            return this.setKeyword(keyword);
          })
    }


  }

  setKeyword(keyword){
    if(keyword){
      if(keyword.trim() && keyword !== ''){

        this.keyword = keyword;

        this.searchService
            .searchCondition
            .next({
              keywords:[keyword]
            })
      }
    } 
  }

  searchByKeyword(e){
    e.preventDefault();
    
    if (e.type === "click" && this.keyword !== ""){
      this.searchService.searchCondition.next({
        keywords:[this.keyword]
      })
    }
  
    if(e.which >= 65 && e.which <= 90 || e.which === 8){
      let value = e.target.value !== '' ? [e.target.value] : undefined;
  
  
      this.searchService.searchCondition.next({
        keywords:value
      })
    }
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();

    this.keyword = '';

  }


}
