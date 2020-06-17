import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-jobs-pricing-info',
  templateUrl: './jobs-pricing-info.component.html',
  styleUrls: ['./jobs-pricing-info.component.scss']
})
export class JobsPricingInfoComponent implements OnInit {

  @Input() form:FormGroup;

  constructor() { }

  ngOnInit() {
    console.log(this.form);
    
  }

}
