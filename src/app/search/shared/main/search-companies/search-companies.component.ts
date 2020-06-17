import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from 'src/app/search/search.service';

@Component({
  selector: 'app-search-companies',
  templateUrl: './search-companies.component.html',
  styleUrls: ['./search-companies.component.scss']
})
export class SearchCompaniesComponent implements OnInit {

  @Input() companyList;
  @Input() amount:number;
  
  constructor(
    public searchService:SearchService
  ) { }

  ngOnInit() {
  }

}
