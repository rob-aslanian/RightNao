import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { JobSuitableFor, JobTravelRequirement } from 'src/app/jobs/models/postJobmodels';
import { AddDocumentComponent } from 'src/app/_shared/components/add-document/add-document.component';

@Component({
  selector: 'app-job-additional-info',
  templateUrl: './job-additional-info.component.html',
  styleUrls: ['./job-additional-info.component.scss']
})
export class JobAdditionalInfoComponent implements OnInit {

  @Input() infoForm:FormGroup;

  @ViewChild(AddDocumentComponent, { static: true }) files:AddDocumentComponent;

  
  numberOf_positions: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  suitableFor = JobSuitableFor;
  travelRequrements = JobTravelRequirement;
  
  constructor(
  ) {
      
   }

  ngOnInit() {
    
  }

  get addInfoForm(){
    return this.infoForm.get('additional_info')
  }

  checksBoxChange(e , idx){
    let target = e.target,
        sutiable:FormArray = this.addInfoForm.get('suitable_for') as FormArray;


    /// Check 
    if(target.checked) {
      sutiable.at(idx).setValue(target.value)
    }
    /// Un-check
    else{
      sutiable.at(idx).setValue(false);
    }

    
  }


  

}
