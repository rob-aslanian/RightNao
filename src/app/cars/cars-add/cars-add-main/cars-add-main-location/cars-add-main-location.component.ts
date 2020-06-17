import { Component, OnInit } from '@angular/core';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { RegionService } from 'src/app/_shared/region.service';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { filter, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { CarsAddService } from '../../cars-add.service';

@Component({
  selector: 'app-cars-add-main-location',
  templateUrl: './cars-add-main-location.component.html',
  styleUrls: ['./cars-add-main-location.component.scss']
})
export class CarsAddMainLocationComponent implements OnInit {
  form:FormGroup;
  isSubmitted:boolean = false;

  cities: any[];
  selectedCity?: any = null;
  selectedCountry?: string;
  countries: any;
  utils = utilities;
  selectedLang: string;

  constructor(
    private region:RegionService,
    private addService:CarsAddService
  ) {
    this.form = new FormGroup({});
   }

  ngOnInit() {
    this.addService.isSubmitted.subscribe( data => this.isSubmitted = data )
    this.countries = this.region.Countries;
  }

  /// Location /// 
  selectCountry(loc){
    let target = loc.target;
    
    target ? this.selectedCountry = target.value : null;
    this.selectedCountry = target.value;

    
    /// Reset city ///       
    this.selectedCity = '';    

  }
 /// City ///
 cityFormatter = (result: any) => result.city;    
  
 /// Search City ///
  searchCity = (text$: Observable<string>) =>    
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term ) =>  term.length > 1? this.getCities(term):[])
    )
  /// Get Cities ///
  getCities(term?:string){

    if(this.selectedCity === null && this.selectedCountry === null) return;


    let city = this.selectedCity !== null ? 
               this.selectedCity.city || this.selectedCity : '';


   if(city !== '' && term !== ''){

    return this.region
               .getCities(this.selectedCountry ,city)
               .pipe(
                 map(({data}) => data['getListOfCities']),
                 filter(cities => {
                   return cities.filter(c => c.city.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
                 })
                )
   }
  }
  
  /// Selected City ///

 selectCity(e:NgbTypeaheadSelectItemEvent){
  if(!e || !e.item){
      return;
  }
  console.log(e.item.id);
  
}
  ////// *******  ////// 

}
