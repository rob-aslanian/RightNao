import { Component, OnInit, Input } from '@angular/core';
import { JobSteppers } from 'src/app/jobs/models/postJobmodels';

@Component({
  selector: 'app-jobs-stepper',
  templateUrl: './jobs-stepper.component.html',
  styleUrls: ['./jobs-stepper.component.scss']
})
export class JobsStepperComponent implements OnInit {

  @Input() page:number = 1;

  steppers = JobSteppers;
  steps = [1,2,3];

  constructor() { }

  ngOnInit() {
  }

}
