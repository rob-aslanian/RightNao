import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { RegionService } from 'src/app/_shared/region.service';
import { AddAdsService } from '../add-ads.service';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss']
})
export class PhonesComponent implements OnInit {
  isSubmitted:boolean = false;
  countryCodes: any = [];
  form:FormGroup;

  constructor(
    private fb: FormBuilder,
    private regionService: RegionService,
    private addService:AddAdsService
  ) {
    this.form = this.addService.addForm;
   }

  ngOnInit() {
    this.addService
        .isSubmitted
        .subscribe( data => this.isSubmitted = data );

    this.regionService
        .getListOfCountryCodes()
        .subscribe(({ data }) => this.countryCodes = data['getListOfCountryCodes'] );

    if(this.addService.phones.length){
      this.addService.phones.forEach(el => {
        this.addNewPhone(el);
      });
    } else {
      this.addNewPhone();
    }
  }

  addNewPhone(el?) {
    const phones = this.form.get('phones') as FormArray;
    phones.push(this.addPhone(el))
  }

  deletePhone( index: number ) {
    const phones = this.form.get('phones') as FormArray;
    phones.removeAt(index);
  }

  addPhone(el?): FormGroup {
    if(el) {
      return this.fb.group({
        number: [el.number, Validators.required ],
        country_code_id: [el.country_code_id, Validators.required ]
      })
    } else {
      return this.fb.group({
        number: ['', Validators.required ],
        country_code_id: ['', Validators.required ]
      })
    }
    
  }

}