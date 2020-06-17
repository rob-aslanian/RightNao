import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RegionService } from 'src/app/_shared/region.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { FormGroup } from '@angular/forms';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-country',
  templateUrl: './search-country.component.html',
  styleUrls: ['./search-country.component.scss']
})
export class SearchCountryComponent implements OnInit {

  @Output() onCountrySelect: EventEmitter<any> = new EventEmitter<any>(); 

  countries = [];
  form:FormGroup;
  selectedCountry = [];
  countryList;

  constructor(
    private region:RegionService,
    private globalService:GlobalUserProService
  ) {
    this.form = new FormGroup({});
    this.region.Countries.subscribe( data => (this.countryList = data) )
   }
  ngOnInit() { }

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
      this.countries
          .filter(el => el.isSelected)
          .map(el => el['name'])

          this.getSelectedCountryes();
  }


  getSelectedCountryes () {
    this.selectedCountry = [];
    this.countries.forEach( (country) => {
      if(country.isSelected) {
        this.selectedCountry.push({
          city: {},
          country_id: country.name
        });
      }

    } )
    this.onCountrySelect.emit(
      {
        type: 'country',
        list: this.selectedCountry
      }
      );
}

  removeSelectedCountry(asc:string) {
    this.countries.forEach( (el) => {
        if(el['name']==asc) 
        {
          el['isSelected'] = false;
        }
      } )
    this.setFormValue();
  }
  




}
