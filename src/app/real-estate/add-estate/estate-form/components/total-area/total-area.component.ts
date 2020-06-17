import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EstateFormService } from '../../../Service/estate-form.service';

@Component({
  selector: 'app-total-area',
  templateUrl: './total-area.component.html',
  styleUrls: ['./total-area.component.scss']
})
export class TotalAreaComponent implements OnInit {

  totalArea: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private estateService: EstateFormService
  ) { 
     this.totalArea = estateService.totalArea;
  }

  ngOnInit() {
    this.estateService
        .sumbitted.subscribe( ( isSumbitted: boolean ) => { if( isSumbitted ) this.isSubmitted = isSumbitted } );
  }

}
