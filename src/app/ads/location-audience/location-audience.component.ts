import { Component, OnInit } from '@angular/core';
import { RegionService } from 'src/app/_shared/region.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdsService } from 'src/app/_shared/services/ads/ads.service';
import { PasswordValidation } from 'src/app/_shared/register.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-audience',
  templateUrl: './location-audience.component.html',
  styleUrls: ['./location-audience.component.scss']
})
export class LocationAudienceComponent implements OnInit {

  cityList = [];
  countryList = [];

  selectedLocations = [];

  allLangs = [];
  selectedLangs:string [] = [];

  ageGenderForm: FormGroup;

  constructor(
    private region: RegionService,
    private fb:FormBuilder,
    private adsService: AdsService,
    private route: Router
  ) {
    this.allLangs = this.region.getListOfLanguages();
    this.ageGenderForm = this.fb.group({
      from: ['',  Validators.compose([PasswordValidation.ageFrom(), PasswordValidation.validateMax('to')])],
      to: ['',   Validators.compose([PasswordValidation.ageTo(), PasswordValidation.validateMin('from')])],
      gender: ['']
    })
  }

  ngOnInit() {}

  get agf(){
    return this.ageGenderForm.controls;
  }


  
  next() {
    if(!this.selectedLocations.length || !this.ageGenderForm.valid) return;
    let input = this.adsService.input;
    input.locations = this.selectedLocations;
    input.age_from = this.agf.from.value ? this.agf.from.value : 13;
    input.age_to = this.agf.to.value ? this.agf.to.value : 120;
    input.languages = this.selectedLangs ? this.selectedLangs : undefined;
    this.route.navigate(['/ads/budget']);
  }

  updateLocationList(e) {
    if(e.type=="city") {
      this.cityList = e.list;
    } else {
      this.countryList = e.list
    }
    this.selectedLocations = [];
    this.selectedLocations = this.cityList.concat(this.countryList);
  }

  radioTypeChange() {
    this.adsService.input.gender = this.agf.gender.value;
  }

  addLang(e) {
    let value = e.target.value;
    if(!this.selectedLangs.includes(value)) {
      this.selectedLangs.push(value);
    }
  }
  
  removeLang(language:string) {
    this.selectedLangs = this.selectedLangs.filter( lang => lang != language );

  }

}
