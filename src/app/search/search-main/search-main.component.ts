import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.scss'],
  encapsulation:ViewEncapsulation.None,
})
export class SearchMainComponent implements OnInit , OnDestroy {

  constructor(
    private activeRoute:ActivatedRoute,
    public searchService:SearchService
  ) {

    const type = this.activeRoute.snapshot.data['type'];

    if (type){
      this.searchService.type = type;
    }
    
   }

  ngOnInit() {
  
  }

  ngOnDestroy(){

    this.searchService.fillterKeywords.next([]);
    this.searchService.searchCondition.next({});
    this.searchService.searchForm.next(null);
    this.searchService.adsList.next(null);
    
  }

}
