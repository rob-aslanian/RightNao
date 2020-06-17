import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { RegionService } from 'src/app/_shared/region.service';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { SearchService } from 'src/app/search/search.service';

@Component({
  selector: 'app-search-city-column',
  templateUrl: './search-city-column.component.html',
  styleUrls: ['./search-city-column.component.scss']
})
export class SearchCityColumnComponent implements OnInit {

  cities = [];

  form:FormGroup;

  constructor(
    private region:RegionService,
    private searchService:SearchService
  ) {
    this.form = new FormGroup({});
   }

  ngOnInit() {
  }

  checkedCity(e){
    const target = e.target;

    this.cities
        .map(el => {
          if(el.name === target.value) {
              el.isSelected = target.checked;
          }
        })
  
    this.setValues();
  }


  formatLocation = (result : any) => result.city
  

  selectLocation(e:NgbTypeaheadSelectItemEvent){
    const item = e.item;

    
    if(!this.cities.includes(item.city)){ 
      this.cities.push({
        id:item.id,
        name:item.city,
        isSelected:true
      });

   }

   this.setValues();

    
  }

  searchLocation = (text:Observable<string>) => 
   text.pipe(
     distinctUntilChanged(),
     switchMap(loc => this.region.searchInListOfAllCities(loc)),
     map(location => location['data']['getListOfAllCities'])
  )

  setValues(){

    const cities = this.cities.filter(city => city.isSelected),
          fillterKeywords = this.searchService.fillterKeywords.value;

      this.searchService
        .fillterKeywords
        .value
        .push(...cities.map(city => {
          return {
            id:city.id,
            name:city.name,
            value:'city'
          }
        }));
    

    this.form.get('city').patchValue(cities.map(city => city.id));
       
  }

}
