import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/search/search.service';
import { SearchCompanyInput } from 'src/app/search/models/search.model';
import { Observable, EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-company-name-column',
  templateUrl: './search-company-name-column.component.html',
  styleUrls: ['./search-company-name-column.component.scss']
})
export class SearchCompanyNameColumnComponent implements OnInit {

  form:FormGroup;
  companies:Observable<any>;
  companyNames = [];

  constructor(
    private searchService:SearchService
  ) { 
    this.form = new FormGroup({});
  }

  ngOnInit() {

  }

  searchCompany(e){
     const item = e.target.value.trim();

     if(item !== "" && item.length > 0 ){
       this.companies = this.searchService
                            .searchCompanies({
                              ...new SearchCompanyInput(),
                              name:item
                            } , {
                              first:10,
                              after:"0"
                            })
                            .pipe(map(data => data['company']))  
     }
  }

  selectCompany(e){
    const item = e instanceof KeyboardEvent ? (<any>e.target).value :
                 e.name;


    if(item.trim() !== ""){
      if(!this.companyNames.some(el => el.name === item)){ 
        this.companyNames.push({
          id: e.id ? e.id : undefined,
          name:item,
          isSelected:true
        });
     }
    }
    
    
    this.companies = EMPTY;
    this.setValues();
  }

  checkeCompanyName(e){
    const target = e.target;

    this.companyNames
        .map(el => {
          if(el.name === target.value) {
              el.isSelected = target.checked;
          }
    })

    this.setValues();
  }


  setValues(){
     const  selecteCompany = this.companyNames.filter(el => el.isSelected),
            companyName = selecteCompany.map(el => el.name),
            companyIds = selecteCompany.filter(el => !!el.id).map(el => el.id),
            type = this.searchService.type;


    if(type === 'people' || type === 'candidate') {
      const currentCompany = type === 'people' ? 'currentCompany' : 'current_company',
            pastCompany    = type === 'people' ? 'pastCompany' : 'past_company';

      this.form.get(currentCompany).patchValue(companyName);
      this.form.get(pastCompany).patchValue(companyName);
    } else {
      this.form.get('company_ids').patchValue(companyIds);
      this.form.get('company_name').patchValue(companyName);
    }

  }

}
