import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from 'src/app/search/search.service';
import { SearchAllTitle } from 'src/app/search/models/search.model';

@Component({
  selector: 'app-search-all-title',
  templateUrl: './search-all-title.component.html',
  styleUrls: ['./search-all-title.component.scss']
})
export class SearchAllTitleComponent implements OnInit {

  @Input() amount:number;
  @Input()  type;
  
  titleData;
 

  constructor(
    public searchService:SearchService
  ) { }

  ngOnInit() {
    this.titleData = SearchAllTitle[this.type];
    
  }

}
