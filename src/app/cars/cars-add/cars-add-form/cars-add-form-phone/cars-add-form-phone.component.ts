import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { CarsAddService } from '../../cars-add.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cars-add-form-phone',
  templateUrl: './cars-add-form-phone.component.html',
  styleUrls: ['./cars-add-form-phone.component.scss']
})
export class CarsAddFormPhoneComponent implements OnInit {
  form:FormGroup;
  isSubmitted:boolean = false;

  constructor(
    private fb:FormBuilder,
    private addService:CarsAddService,
    private activatedRouter:ActivatedRoute

  ) {
    this.form = this.fb.group({})
   }

  ngOnInit() {
    this.addService.isSubmitted.subscribe( data => this.isSubmitted = data )

    this.activatedRouter.parent.params.subscribe( ({ action }) => {
      if( action == 'edit' ) {
        console.log(this.addService.numbers);
        this.addService.numbers.forEach(el => { this.addAnother(el) });
      } else {
        this.addAnother('');
      }
  } )
  }

  initaliazeValue(value:string): FormControl {
    return this.fb.control(value, Validators.required)
  }
  

  get Phones() {
    return this.form.get('phoneNumber') as FormArray
  }

  addAnother(value:string) {
    this.Phones.push(this.initaliazeValue(value))
  }

  remove(i:number){
    this.Phones.removeAt(i);
  }
  value() {
    console.log(this.Phones.value);
    
  }

}
