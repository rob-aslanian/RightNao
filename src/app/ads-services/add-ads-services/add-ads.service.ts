import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AddAdsService {
  files:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  addForm:FormGroup;
  isSubmitted:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  phones = [];


  constructor(
    private fb:FormBuilder
  ) {
    this.addForm = this.fb.group({
      service: ['', Validators.required],
      sub_category: ['', Validators.required],
      detail: this.fb.group({
        title: ['', Validators.required],
        description: ['']
      }),
      phones: this.fb.array([ ]),
      price: this.fb.group({
        price_type: ['', Validators.required],
        fix_price: [],
        min_price: [],
        max_price: [],
        currency: ['']
      }),
      location: this.fb.group({
        city: ['', Validators.required],
        country_id: ['', Validators.required]
      })
    })
   }
}
