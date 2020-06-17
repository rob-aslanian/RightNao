import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from 'src/app/search/search.service';

@Component({
  selector: 'app-search-candidates',
  templateUrl: './search-candidates.component.html',
  styleUrls: ['./search-candidates.component.scss']
})
export class SearchCandidatesComponent implements OnInit {

  @Input() candidateList;
  @Input() amount:number;

  companyID:string;

  constructor(
    private searchService:SearchService
  ) {
    this.companyID = searchService.company_id;
   }

  ngOnInit() {
  }

}
