import { Component, OnInit, Input } from '@angular/core';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { RegionService } from 'src/app/_shared/region.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-location-currency',
  templateUrl: './location-currency.component.html',
  styleUrls: ['./location-currency.component.scss']
})
export class LocationCurrencyComponent implements OnInit {

  @Input() form:FormGroup;
  
  utils = utilities;
  countries;
  curriencies;
  

  constructor(
    private regionService:RegionService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){

    /// Countries 
    this.regionService.Countries.subscribe(
      (data) =>   this.countries  = data,
      (err) => console.log(err)
    )

    /// Curencies 
    this.curriencies = utilities.getAllCurency();
  }

  trackByFn =  (index) => index;

}
