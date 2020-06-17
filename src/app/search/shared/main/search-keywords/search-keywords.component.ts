import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/search/search.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-keywords',
  templateUrl: './search-keywords.component.html',
  styleUrls: ['./search-keywords.component.scss']
})
export class SearchKeywordsComponent implements OnInit {

  keywords:Observable<any>;
  filterName:string;
  
  constructor(
    private searchService:SearchService
  ) { }

  ngOnInit() {

    this.keywords = this.searchService
                        .fillterKeywords;
  }

  clearFillter(){

    this.searchService
        .searchForm
        .value
        .reset();

    this.searchService
        .fillterKeywords.next([]);

    this.searchService
        .searchCondition
        .next(null)
  }


  saveFilter(){
    this.searchService
        .saveFillter(this.filterName , this.searchService.searchCondition.value)
        .subscribe(
          () => { this.filterName = '' }
        )
  }

  removeKeyword(keyword:any) {

    const { id , value }  = keyword,
          searchCondition = this.searchService.searchCondition,
          fillterKeywords = this.searchService.fillterKeywords,
          searchForm      = this.searchService.searchForm,
          indexOfKeyword  = fillterKeywords.value
                                          .findIndex(el => 
                                            el['value'] === value && 
                                            (el['id'] === id || el['name'] === id )
                                          );




    searchForm.value.get(value).setValue(null);
    searchForm.next(searchForm.value);

    fillterKeywords.value.splice(indexOfKeyword , 1);
    fillterKeywords.next(fillterKeywords.value);


    searchCondition.value[value] = undefined;
    searchCondition.next(searchCondition.value);  
  
  } 


}
