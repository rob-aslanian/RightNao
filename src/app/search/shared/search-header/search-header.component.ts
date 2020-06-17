import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../search.service';
import { SearchHeader, SearchByType } from '../../models/search.model';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent implements OnInit {

  header;
  
  constructor(
    private searchService:SearchService
  ) { 
    const type = searchService.type;

    if(type){
      this.header = SearchHeader[type];
    }
  }

  ngOnInit() {
  }

}
