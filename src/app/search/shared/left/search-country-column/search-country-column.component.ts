import { Component, OnInit } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RegionService } from 'src/app/_shared/region.service';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { SearchService } from 'src/app/search/search.service';

@Component({
  selector: 'app-search-country-column',
  templateUrl: './search-country-column.component.html',
  styleUrls: ['./search-country-column.component.scss']
})
export class SearchCountryColumnComponent implements OnInit {

  countries = [];
  form:FormGroup;
  selectedCountry:string[] = [];
  countryList;

  constructor(
    private globalService:GlobalUserProService,
    private region:RegionService,
    private searchService:SearchService
  ) {

    this.form = new FormGroup({});
    this.region.Countries.subscribe(data => (this.countryList = data));
    this.countries.push({
      name:globalService.location,
      isSelected:false
    });
   }

  ngOnInit() {
    this.form = this.searchService.searchForm.getValue();

  }

  selectCountry(e){
    const target = e.target;

    if(target.value === 'anywhere'){
       this.countries.map(el => el.isSelected = false)
      //  this.form.get('country').reset();
    }
    else{
      this.countries
          .map(el => {
            if(el.name === target.value) {
               el.isSelected = target.checked;
            }
          })
    }

    this.setFormValue();
  }

  searchCountry = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length === 0
          ? []
          : this.countryList.filter(
              c => c.name.toLowerCase().indexOf(term.toLowerCase()) > -1
            ).slice(0, 10)
      )
    );

  countryFormatter = (result: any) => result.name;

  selectLocation(e: NgbTypeaheadSelectItemEvent) {
     const item = e.item;

     if(!this.countries.includes(item.asc)){
       this.countries.push({
         name:item.asc,
         isSelected:true
       });

       this.setFormValue();
    }

  }

  setFormValue(){
    this.form.get('country').patchValue(
      this.countries
          .filter(el => el.isSelected)
          .map(el => el['name'])
     )
  }


}
