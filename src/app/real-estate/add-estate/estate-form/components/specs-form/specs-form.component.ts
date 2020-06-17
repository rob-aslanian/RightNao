import { Component, OnInit } from '@angular/core';
import { EstateFormService } from '../../../Service/estate-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-specs-form',
  templateUrl: './specs-form.component.html',
  styleUrls: ['./specs-form.component.scss']
})
export class SpecsFormComponent implements OnInit {

  specsForm: FormGroup;
  isSubmitted: boolean = false;
  
  constructor(
    private estateForm: EstateFormService
  ) {
      this.specsForm = estateForm.specsForm;
   }

  ngOnInit() {
    this.estateForm
        .sumbitted.subscribe( ( isSumbitted ) => this.isSubmitted = isSumbitted );
  }

}
