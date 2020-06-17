import { Component, OnInit } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { EstateFormService } from '../../../Service/estate-form.service';

@Component({
  selector: 'app-avilability-home',
  templateUrl: './avilability-home.component.html',
  styleUrls: ['./avilability-home.component.scss']
})
export class AvilabilityHomeComponent implements OnInit {

  date: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private estateService: EstateFormService
  ) { 
      this.date = estateService.date;
  }

  ngOnInit() {
      this.estateService
          .sumbitted.subscribe( ( isSubmitted ) => this.isSubmitted = isSubmitted );
  }

}
