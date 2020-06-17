import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SearchService } from 'src/app/search/search.service';
import { SearchByType, SERVICE_OWNER } from 'src/app/search/models/search.model';

@Component({
  selector: 'app-search-show-only-column',
  templateUrl: './search-show-only-column.component.html',
  styleUrls: ['./search-show-only-column.component.scss']
})
export class SearchShowOnlyColumnComponent implements OnInit {

  form:FormGroup;
  type: SearchByType = 'people';
  SERVICE_OWNER = SERVICE_OWNER;

  constructor(
    private searchService:SearchService,
  ) { 
    this.form = new FormGroup({});
  }

  ngOnInit() {
    this.type = this.searchService.type;
  }

}
