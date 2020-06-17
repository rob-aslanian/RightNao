import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from 'src/app/search/search.service';

@Component({
  selector: 'app-search-services',
  templateUrl: './search-services.component.html',
  styleUrls: ['./search-services.component.scss']
})
export class SearchServicesComponent implements OnInit {

  @Input() serviceList;
  @Input() amount:number;

  constructor(
    public searchService:SearchService,
  ) { }

  ngOnInit() {
  }

}
