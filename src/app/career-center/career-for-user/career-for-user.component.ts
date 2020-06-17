import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/search/search.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-career-for-user',
  templateUrl: './career-for-user.component.html',
  styleUrls: ['./career-for-user.component.scss']
})
export class CareerForUserComponent implements OnInit {

  companies:Observable<any>;

  constructor(
    private searchService:SearchService
  ) {
    this.searchService.type = 'company';
   }

  ngOnInit() {

     this.companies = this.searchService
                          .searchAll({
                            first:30,
                            after:"0"
                          } , { is_career_center_opened:true })
  }

  searchCompany(e){

    if(e.which >= 65 && e.which <= 90 || e.which === 8){
      let value = e.target.value !== '' ? [e.target.value] : undefined;


      this.companies = this.searchService
                            .searchAll({
                              first:30,
                              after:"0"
                            } , { 
                              keywords:value,
                              is_career_center_opened:true 
                            })
    }


  }

}
