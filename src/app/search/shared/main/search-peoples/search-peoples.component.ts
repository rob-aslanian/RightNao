import { Component, OnInit, Input } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { SearchService } from 'src/app/search/search.service';

@Component({
  selector: 'app-search-peoples',
  templateUrl: './search-peoples.component.html',
  styleUrls: ['./search-peoples.component.scss']
})
export class SearchPeoplesComponent implements OnInit {

  @Input() peopleList;
  @Input() amount:number;

  isCompanyActive:boolean;

  constructor(
    private globalService:GlobalUserProService,
    public searchService:SearchService,
  ) { }

  ngOnInit() {
  }

}
