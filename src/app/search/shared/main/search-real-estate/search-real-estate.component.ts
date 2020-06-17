import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from 'src/app/search/search.service';

@Component({
  selector: 'app-search-real-estate',
  templateUrl: './search-real-estate.component.html',
  styleUrls: ['./search-real-estate.component.scss']
})
export class SearchRealEstateComponent implements OnInit {

  @Input() estateList;
  @Input() amount:number;

  constructor(
    public searchService:SearchService,
  ) { }

  ngOnInit() {
  }

}
