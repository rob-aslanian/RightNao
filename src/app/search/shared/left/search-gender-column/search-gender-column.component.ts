import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SearchService } from 'src/app/search/search.service';

@Component({
  selector: 'app-search-gender-column',
  templateUrl: './search-gender-column.component.html',
  styleUrls: ['./search-gender-column.component.scss']
})
export class SearchGenderColumnComponent implements OnInit {



  form:FormGroup;
  constructor(
    private searchService:SearchService
  ) { 
    this.form = new FormGroup({});
  }

  ngOnInit() {
  }

  genderChnage(e:string){
    const searchCondition = this.searchService.searchCondition,
          isFemale =  e === "female";

    searchCondition.next({ 
      ...searchCondition.getValue(),
      isFemale,
      isMale:!isFemale
    });

    
  }

}
