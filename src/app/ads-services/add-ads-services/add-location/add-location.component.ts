import { Component, OnInit, Input } from '@angular/core';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { RegionService } from 'src/app/_shared/region.service';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { filter, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { AddAdsService } from '../add-ads.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
  form:FormGroup;
  listOfLanguages: Observable<any[]>;
  selectedCountry: string;
  isSubmitted:boolean = false;
  constructor(
    private addService:AddAdsService,
    private regionService:RegionService
  ){
    this.form = this.addService.addForm;
    this.listOfLanguages = regionService.getListOfCountries();
  }
  ngOnInit(){
    this.form
        .get('location')
        .get('country_id').valueChanges.subscribe( countryId => this.selectedCountry = countryId );
    this.addService.isSubmitted.subscribe( data => this.isSubmitted = data );
  }

  cityFormatter = (result: any) => result.city;    

  searchCity = (text$: Observable<string>) =>    
      text$.pipe(
        debounceTime(100),
        distinctUntilChanged(),
        switchMap((term ) =>  term.length > 2 ? this.getCities(term): [])
      )


  getCities(term?:string){ 

    let city =  term;
    
    if(city !== '' && term !== ''){

        return this.regionService
                  .getCities(this.selectedCountry,city)
                  .pipe(
                    map(({data}) => data['getListOfCities']),
                      filter(cities => {
                          return cities.filter(c => c.city.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
                      })
                    )
      }
    }
}