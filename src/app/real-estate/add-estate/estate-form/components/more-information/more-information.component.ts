import { Component, OnInit } from '@angular/core';
import { information } from '../../../../Shared/models/estate-model';
import { EstateFormService } from '../../../Service/estate-form.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-more-information',
  templateUrl: './more-information.component.html',
  styleUrls: ['./more-information.component.scss']
})
export class MoreInformationComponent implements OnInit {
  
  information = information;
  informationCtrl: FormControl;
  isSubmitted: boolean = false;
  
  constructor(
    private estateService: EstateFormService
  ) {
      this.informationCtrl = this.estateService.information;  
    }

  ngOnInit() {
     this.estateService
         .sumbitted.subscribe( ( isSubmitted ) => this.isSubmitted = isSubmitted  );
  }

}
