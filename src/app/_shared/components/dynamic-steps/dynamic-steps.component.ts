import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import model from './steps.model';
import { RealEstateService } from 'src/app/real-estate/add-estate/Service/real-estate.service';

@Component({
  selector: 'app-dynamic-steps',
  templateUrl: './dynamic-steps.component.html',
  styleUrls: ['./dynamic-steps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicStepsComponent implements OnInit {

  stepAmoun: number = 0;

  @Input() 
   set stepAmount( step: number ) {
         this.stepAmoun = step;        
   };

  @Input() 
    currentStep: number = 0;

  get steps() {
     const steps = [];
     let step = this.stepAmoun;
        while( step ) {
              steps.push(step);
              step--;
        } ;
        return steps.reverse();
  };

  @Input()
     type: string = 'estate';

  selectedModel: any = null;
  model = model;

  constructor( ) { }

  ngOnInit() {
     this.selectedModel = this.model[this.type];
  }

}
