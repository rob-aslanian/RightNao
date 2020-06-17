import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CarsAddService } from '../../cars-add.service';

@Component({
  selector: 'app-cars-add-form-owners',
  templateUrl: './cars-add-form-owners.component.html',
  styleUrls: ['./cars-add-form-owners.component.scss']
})
export class CarsAddFormOwnersComponent implements OnInit {
  form:FormGroup;
  isSubmitted:boolean = false;

  owners = [
    {
      type: 1,
      text: 'Up to 1',
    },
    {
      type: 2,
      text: 'Up to 2',
    },
    {
      type: 3,
      text: 'Up to 3',
    },
    {
      type: 4,
      text: 'Up to 4',
    },
    {
      type: 5,
      text: 'More than 4',
    }
  ]

  constructor(
    private addService:CarsAddService
  ) {
    this.form = new FormGroup({});
   }

  ngOnInit() {
    this.addService.isSubmitted.subscribe( data => this.isSubmitted = data )
  }
  parseToInt(e, controlName) {
    let value = e.target.value;
     this.form.get(controlName).setValue(+value);
    }

}
