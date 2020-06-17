import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RegionService } from 'src/app/_shared/region.service';
import { Observable } from 'rxjs';
import { distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss']
})
export class SearchCityComponent implements OnInit {



  cities = [];
  selectedCities = [];

  @Output() onCitySelect:EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private region: RegionService
  ) {
  }

  ngOnInit() {
  }

  removeSelectedCity(name:string) {
    this.cities.forEach( (el) => {
        if(el['city']==name) 
        {
          el['isSelected'] = false;
        }
      } )
    this.setValues();
  }


  checkedCity(e){
    const target = e.target;

    this.cities
        .map(el => {
          if(el.city === target.value) {
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
        city:item.city,
        subdivision: item.subdivision,
        countryId: item.country,
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

    const cities = this.cities.filter(city => city.isSelected);

        this.selectedCities = [];
        this.selectedCities
            .push(...cities.map(city => {
              return {
                city: {
                  id:city.id,
                  city:city.city,
                  subdivision:city.subdivision
                },
                country_id: city.countryId
              }
            }));
            this.onCitySelect.emit(
              {
                type: 'city',
                list: this.selectedCities
              }
            )
        
        
  }

}
